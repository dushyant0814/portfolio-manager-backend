const { securities, transactions, user_portfolio_info, portfolio } = require('../models');
const config = require('config');
/////////////////////////////MODEL-ASSOCIATIONS///////////////////////////////////////
transactions.belongsTo(securities, { foreignKey: 'security_id_fk', targetKey: 'id' });
user_portfolio_info.belongsTo(securities, { foreignKey: 'security_id_fk', targetKey: 'id' });
//////////////////////////////////////////////////////////////////////////////////////
let funcs = {};

funcs.createTrade = function ({ model }, transaction = null) {
  return transactions.create(model, { transaction });
};

funcs.getUserPortfolioInfo = function ({
  query,
  securityAttributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] },
  findAndCountAll = false,
  findAll = false,
  attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] }
}) {
  if (findAndCountAll) {
    return user_portfolio_info.findAndCountAll({
      where: query,
      attributes,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: securities,
          attributes: securityAttributes,
          required: true
        }
      ]
    });
  }
  if (findAll) {
    return user_portfolio_info.findAll({
      where: query,
      attributes,
      include: [
        {
          model: securities,
          attributes: securityAttributes,
          required: true
        }
      ]
    });
  }
  return user_portfolio_info.findOne({ where: query, attributes });
};

funcs.createUserPortfolioInfo = function ({ model }, transaction = null) {
  return user_portfolio_info.create(model, { transaction });
};

funcs.updateUserPortfolioInfo = function (
  { model, portfolioInstance, destroy = false },
  transaction = null
) {
  if (destroy) {
    return portfolioInstance.destroy();
  }
  return portfolioInstance.update(model, { transaction });
};

funcs.createPortfolio = function ({ model }, transaction) {
  return portfolio.create(model, { transaction });
};

funcs.getPortfolio = function ({
  query,
  attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] }
}) {
  return portfolio.findOne({ where: query, attributes });
};

funcs.getTransactions = function ({
  limit = config.get('limit'),
  offset = config.get('offset'),
  query,
  findOne = false,
  attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] },
  securityAttributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] }
}) {
  if (findOne) {
    return transactions.findOne({ where: query, attributes });
  }
  return transactions.findAndCountAll({
    limit,
    offset,
    where: query,
    attributes,
    order: [['created_at', 'DESC']],
    include: [
      {
        model: securities,
        attributes: securityAttributes,
        required: true
      }
    ]
  });
};

funcs.deleteTransaction = function ({ query }, transaction) {
  return transactions.destroy({ where: query, transaction });
};
funcs.updateTransaction = function ({ model, lastTransactionInstance }, transaction = null) {
  return lastTransactionInstance.update(model, { transaction });
};

module.exports = funcs;
