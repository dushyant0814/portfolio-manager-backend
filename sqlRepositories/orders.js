const { securities, transactions, user_portfolio_info, portfolio } = require('./models');
/////////////////////////////MODEL-ASSOCIATIONS///////////////////////////////////////
transactions.belongsTo(securities, { foreignKey: 'security_id_fk', targetKey: 'id' });
//////////////////////////////////////////////////////////////////////////////////////
let funcs = {};

funcs.createTrade = async function ({ model }, transaction = null) {
  return transactions.create(model, { transaction });
};

funcs.getUserPortfolioInfo = async function ({
  query,
  attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] }
}) {
  return user_portfolio_info.findOne({ where: query, attributes });
};

funcs.createUserPortfolioInfo = async function ({ model }, transaction = null) {
  return user_portfolio_info.create(model, { transaction });
};

funcs.updateUserPortfolioInfo = async function ({ model, portfolioInstance }, transaction = null) {
  return portfolioInstance.update(model, { transaction });
};

funcs.createPortfolio = async function ({ model }, transaction) {
  return portfolio.create(model, { transaction });
};

funcs.getPortfolio = async function ({
  query,
  attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] }
}) {
  return portfolio.findOne({ where: query, attributes });
};

funcs.getTransactions = async function ({
  limit,
  offset,
  query,
  attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] },
  securityAttributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] }
}) {
  return transactions.findAndCountAll({
    limit,
    offset,
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
};
module.exports = funcs;
