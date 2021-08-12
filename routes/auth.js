const express = require('express');
const router = express.Router();
const service = require('../services/auth');
const requestHandler = require('./requestHandler');

router.post(
  '/create',
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

module.exports = router;
