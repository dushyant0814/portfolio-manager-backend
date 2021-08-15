const orderManager = require('../sqlRepositories/managers/orders');
const config = require('config');
const sequelize = require('../sqlRepositories/models/index').sequelize;
const utilityManager = require('../utils/utils');
const async = require('async');
let funcs = {};

funcs.addTrade = async function ({
  type = null,
  stock_id = null,
  price = null,
  quantity = null,
  portfolio_id = null
}) {
  const transaction = await sequelize.transaction();
  let response;
  try {
    //new trade being added to the system
    response = await async.autoInject({
      createTxnResponse: async function () {
        return await orderManager.createTrade(
          {
            model: {
              type_of_trade: type,
              security_id_fk: stock_id,
              price: price,
              quantity: quantity,
              portfolio_id_fk: portfolio_id
            }
          },
          transaction
        );
      },
      portfolioUpdateResponse: async function () {
        return handleUpdateInPortfolio({ type, stock_id, price, quantity, portfolio_id });
      }
    });
    if (transaction) await transaction.commit();
    return response;
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};

funcs.fetchTrades = async function ({
  portfolio_id,
  limit = config.get('limit'),
  offset = config.get('offset')
}) {
  return await orderManager.getTransactions({
    limit,
    offset: limit * offset,
    query: { portfolio_id_fk: portfolio_id },
    attributes: ['type_of_trade', 'security_id_fk', 'price', 'quantity', 'id'],
    securityAttributes: ['ticker_symbol']
  });
};

funcs.fetchPortfolio = async function ({ portfolio_id }) {
  return await orderManager.getUserPortfolioInfo({
    findAndCountAll: true,
    query: { portfolio_id_fk: portfolio_id },
    attributes: ['avg_buy_price', 'quantity', 'security_id_fk'],
    securityAttributes: ['ticker_symbol']
  });
};

funcs.fetchReturns = async function ({ portfolio_id }) {
  return await orderManager.getUserPortfolioInfo({
    findAll: true,
    query: { portfolio_id_fk: portfolio_id },
    attributes: ['avg_buy_price', 'quantity', 'security_id_fk'],
    securityAttributes: ['ticker_symbol']
  });
};

funcs.updateTrade = async function ({
  type = null,
  stock_id = null,
  price = null,
  quantity = null,
  portfolio_id = null,
  trade_id = null,
  delete_trade = false
}) {
  const lastTransactionInstance = await orderManager.getTransactions({
    findOne: true,
    query: { id: trade_id },
    attributes: ['type_of_trade', 'security_id_fk', 'price', 'quantity']
  });
  if (!lastTransactionInstance)
    throw {
      message: `No transaction exist with trade_id ${trade_id}`,
      status: config.get('httpStatusCodes.badRequest')
    };
  const portfolioInstance = await orderManager.getUserPortfolioInfo({
    query: { portfolio_id_fk: portfolio_id, security_id_fk: lastTransactionInstance.security_id_fk }
  });
  //need to reset portfolio to it's last updated state
  const resetTradeFromUserPortfolioModel = utilityManager.getLastPortfolioInfo({
    portfolioInstance,
    lastTransactionInstance
  });
  const transaction = await sequelize.transaction();
  let response;
  try {
    response = await async.autoInject({
      resetPortfolioFromLastTrade: async function () {
        if (resetTradeFromUserPortfolioModel.quantity === 0) {
          await portfolioInstance.destroy({ transaction });
          return null;
        }
        return await orderManager.updateUserPortfolioInfo(
          { model: resetTradeFromUserPortfolioModel, portfolioInstance },
          transaction
        );
      },
      updateTransaction: async function () {
        if (delete_trade) return null;
        return await orderManager.updateTransaction(
          {
            model: {
              id: trade_id,
              type_of_trade: type,
              security_id_fk: stock_id,
              price: price,
              quantity: quantity,
              portfolio_id_fk: portfolio_id
            },
            lastTransactionInstance
          },
          transaction
        );
      },
      updatePortfolioWithNewTrade: async function () {
        if (delete_trade) return null;
        return handleUpdateInPortfolio(
          { type, stock_id, price, quantity, portfolio_id },
          transaction
        );
      },
      deleteTrade: async function () {
        if (!delete_trade) return null;
        return await orderManager.deleteTransaction({ query: { id: trade_id } }, transaction);
      }
    });
    if (transaction) await transaction.commit();
    return response;
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};

module.exports = funcs;

async function handleUpdateInPortfolio(
  { type = null, stock_id = null, price = null, quantity = null, portfolio_id = null },
  transaction
) {
  const portfolioInstance = await orderManager.getUserPortfolioInfo({
    query: { security_id_fk: stock_id, portfolio_id_fk: portfolio_id }
  });
  if (!portfolioInstance && type == config.get('trade.type.SELL')) {
    throw {
      message: `User doesn't hold this security which they can sell`,
      status: config.get('httpStatusCodes.badRequest')
    };
  }
  let createUserPortfolioInfo = null,
    updateUserPortfolioInfo = null;
  //if the instance doesn't exist it means the user is buying that particular stock for the first time
  if (!portfolioInstance) {
    createUserPortfolioInfo = await orderManager.createUserPortfolioInfo(
      {
        model: {
          security_id_fk: stock_id,
          portfolio_id_fk: portfolio_id,
          avg_buy_price: price,
          quantity: quantity
        }
      },
      transaction
    );
  } else {
    //need to adjust portfolio for that particular stock id
    const model = utilityManager.createPortfolioModel({
      portfolioInstance: portfolioInstance,
      newTrasaction: {
        type,
        price,
        quantity
      }
    });
    updateUserPortfolioInfo = await orderManager.updateUserPortfolioInfo(
      { model, portfolioInstance },
      transaction
    );
  }
  return { createUserPortfolioInfo, updateUserPortfolioInfo };
}
