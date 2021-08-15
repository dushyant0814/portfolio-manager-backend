const express = require('express');
const router = express.Router();
const service = require('../services/security');
const requestHandler = require('./requestHandler');

router.post(
  '/stock',
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({
      message: 'success',
      data:
        (await service.addStock({
          ...req.body
        })) || {}
    });
  })
);

router.get(
  '/list',
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({
      message: 'success',
      data:
        (await service.getSecurities({
          ...req.body
        })) || {}
    });
  })
);

module.exports = router;
