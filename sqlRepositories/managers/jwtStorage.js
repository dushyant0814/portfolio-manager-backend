const { jwt_storage } = require('../models');
const config = require('config');
let funcs = {};

funcs.setJwt = async function ({ token, user_id }) {
  if (!token || isNaN(user_id))
    throw {
      msg: 'user_id and  token are required',
      status: config.get('httpStatusCodes.badRequest')
    };
  return await jwt_storage.create({
    token,
    user_id
  });
};

funcs.expireJwt = async function ({ query }) {
  const model = await jwt_storage.findOne({ where: query });
  if (!model)
    throw {
      msg: `no entry found for query ${query}`,
      status: config.get('httpStatusCodes.badRequest')
    };
  return await model.update({
    expires_at: new Date(Date.now() - config.get('oneDaySeconds') * 365 * 50)
  });
};
module.exports = funcs;
