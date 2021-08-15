const express = require('express');
const router = express.Router();
const service = require('../services/auth');
const auth = require('../middlewares/auth');
const requestHandler = require('./requestHandler');

router.post(
  '/signup',
  requestHandler.handleRequest(async function (req, res, next) {
    return res
      .status(200)
      .send({ message: 'success', data: (await service.createUser(req.body)) || {} });
  })
);

router.post(
  '/login',
  requestHandler.handleRequest(async function (req, res, next) {
    return res
      .status(200)
      .send({ message: 'success', token: (await service.login(req.body)) || {} });
  })
);

router.delete(
  '/logout',
  auth,
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({
      message: 'User has logged out successfully',
      data:
        (await service.logout({
          token: req.headers.authorization.slice(7),
          user_id: req.decodedTokenData.data.id
        })) || {}
    });
  })
);

module.exports = router;
