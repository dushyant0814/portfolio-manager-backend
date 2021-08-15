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
  if (!stock_id || !price || !quantity || !portfolio_id || !type) {
    throw {
      message: 'adding a trade is not possible without providing all the neccessary fields'
    };
  }
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
    attributes: ['type_of_trade', 'security_id_fk', 'price', 'quantity'],
    securityAttributes: ['ticker_symbol']
  });
};

funcs.fetchPortfolio = async function ({
  portfolio_id,
  limit = config.get('limit'),
  offset = config.get('offset')
}) {
  return await orderManager.getUserPortfolioInfo({
    limit,
    offset: limit * offset,
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
module.exports = funcs;
