const authManager = require('../sqlRepositories//managers/auth');
const orderManager = require('../sqlRepositories/managers/orders');
const jwtResolvers = require('../sqlRepositories/managers/jwtStorage');
const config = require('config');
const bcrypt = require('bcrypt');
const sequelize = require('../sqlRepositories/models/index').sequelize;
const jwt = require('jsonwebtoken');
let funcs = {};

funcs.createUser = async function ({ name, username, email, mobile, password }) {
  //if user is already present with email or mobile throws error
  if (await findUserWithEmailAndMobile({ query: { email, mobile } })) {
    throw {
      message: `User with email ${email} or ${mobile} already exists.`,
      status: config.get('httpStatusCodes.conflict')
    };
  }
  const transaction = await sequelize.transaction();
  try {
    const userCreatedResponse = await authManager.createUser(
      {
        model: {
          name,
          username,
          email,
          mobile,
          password: await bcrypt.hash(password, config.get(`auth.salt_rounds`))
        }
      },
      transaction
    );
    //creating a default portfolio for the user
    const portfolioResponse = await orderManager.createPortfolio(
      {
        model: {
          user_id_fk: userCreatedResponse.id
        }
      },
      transaction
    );
    if (transaction) {
      await transaction.commit();
    }
    return { userCreatedResponse, portfolioResponse };
  } catch (e) {
    if (transaction) {
      await transaction.rollback();
    }
    throw e;
  }
};

funcs.login = async function ({ email, password }) {
  const user = await findUserWithEmailAndMobile({ query: { email } });
  if (!user) {
    throw {
      message: `User with ${email} does not exist`,
      status: config.get('httpStatusCodes.unauthorized')
    };
  }
  const passwordVerfied = await bcrypt.compare(password, user.password);
  if (!passwordVerfied) {
    throw {
      message: `Wrong password`,
      status: config.get('httpStatusCodes.unauthorized')
    };
  }
  //storing tokens for authentication purpose
  const token = await funcs.generateLoginJwt({
    email,
    id: user.id,
    name: user.name,
    username: user.username
  });
  return {
    token,
    token_details: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }
  };
};

funcs.generateLoginJwt = async function ({ id, email, name, username }) {
  const jwtToken = await jwt.sign(
    {
      data: {
        email,
        id,
        name,
        username
      }
    },
    config.get('auth.company_secret'),
    {
      expiresIn: config.get('auth.expiration')
    }
  );
  //Saving the jwt token in DB, this token will be expired as soon as user logout from the browser
  await jwtResolvers.setJwt({ token: jwtToken, user_id: id });
  return jwtToken;
};
//expires the particular token
funcs.logout = async function ({ token, user_id }) {
  if (!user_id || !token)
    throw {
      msg:
        'user_id is necessary field to process the request' +
        'token is also required, in case if you want to expire only single token',
      status: config.get('httpStatusCodes.badRequest')
    };
  return await jwtResolvers.expireJwt({ query: { token, user_id, expires_at: null } });
};

module.exports = funcs;

async function findUserWithEmailAndMobile({ query }) {
  return await authManager.findUser({
    query,
    attributes: ['id', 'name', 'password']
  });
}
