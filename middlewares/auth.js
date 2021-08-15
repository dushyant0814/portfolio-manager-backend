const config = require('config');
const jwt = require('jsonwebtoken');
const orderManager = require('../sqlRepositories/managers/orders');

module.exports = async (req, res, next) => {
  const authHeader =
    req.get('Authorization') ||
    (req && req.query && req.query.token && `Bearer ${req.query.token}`);
  if (!authHeader)
    return res.status(401).send({
      msg: 'JWT token is missing',
      description: 'Required a Bearer token in headers'
    });
  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await jwt.verify(token, config.get('auth.company_secret'));
    const userPortfolioId = await orderManager.getPortfolio({
      query: { user_id_fk: decodedToken.data.id },
      attributes: ['id']
    });
    decodedToken.data.portfolio_id = userPortfolioId.id;
    req.decodedTokenData = decodedToken;
    next();
  } catch (e) {
    return res.status(401).send({
      msg: 'JWT token failed to verify',
      description: 'Please share correct token'
    });
  }
};
