const { jwt_storage } = require('./models');
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

module.exports = funcs;
