const { securities } = require('../models');

let funcs = {};

funcs.createSecurity = function ({ model }) {
  return securities.create(model);
};

funcs.getSecurities = function ({
  limit,
  offset,
  attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] }
}) {
  return securities.findAndCountAll({ limit, offset, attributes });
};

module.exports = funcs;
