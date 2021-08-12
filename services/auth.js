const authManager = require('../sqlRepositories/auth');
const jwtResolvers = require('../sqlRepositories/jwtStorage');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let funcs = {};

funcs.createUser = async function ({ name, username, email, mobile, password }) {
  if (await findUserWithEmail({ email })) {
    throw {
      message: `User with email ${email} already exists.`,
      status: config.get('httpStatusCodes.conflict')
    };
  }
  const userCreatedResponse = await authManager.createUser({
    model: {
      name,
      username,
      email,
      mobile,
      password: await bcrypt.hash(password, config.get(`auth.salt_rounds`))
    }
  });
  return userCreatedResponse;
};

funcs.login = async function ({ email, password }) {
  const user = await findUserWithEmail({ email });
  const passwordVerfied = await bcrypt.compare(password, user.password);
  if (!passwordVerfied) {
    throw {
      message: `Wrong password`,
      status: config.get('httpStatusCodes.unauthorized')
    };
  }
  const token = await funcs.generateLoginJwt({
    email,
    id: user.id,
    name: user.name,
    username: user.username
  });
  return token;
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

module.exports = funcs;

async function findUserWithEmail({ email }) {
  return await authManager.findUser({
    query: { email },
    attributes: ['id', 'name', 'password']
  });
}
