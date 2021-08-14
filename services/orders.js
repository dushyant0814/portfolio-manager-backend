const orderManager = require('../sqlRepositories/orders');
const config = require('config');
const sequelize = require('../sqlRepositories/models/index').sequelize;
const utilityManager = require('../utils/utils');
const async = require('async');
let funcs = {};

funcs.upsertTrade = async function ({
  type = null,
  stock_id = null,
  price = null,
  quantity = null,
  portfolio_id = null,
  trade_id = null //for update trade operation
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
    if (!trade_id) {
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
    }
    if (transaction) await transaction.commit();
    return response;
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw e;
  }
};
module.exports = funcs;
