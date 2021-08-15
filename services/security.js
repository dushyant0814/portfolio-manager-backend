const securityManager = require('../sqlRepositories/managers/security');
const config = require('config');
let funcs = {};

funcs.addStock = async function ({ name, ticker_symbol }) {
  return await securityManager.createSecurity({ model: { name, ticker_symbol } });
};

funcs.getSecurities = async function ({
  limit = config.get('limit'),
  offset = config.get('offset')
}) {
  return await securityManager.getSecurities({ limit, offset: limit * offset });
};

module.exports = funcs;
