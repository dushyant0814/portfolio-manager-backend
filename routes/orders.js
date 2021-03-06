const express = require('express');
const router = express.Router();
const service = require('../services/orders');
const requestHandler = require('./requestHandler');
const serializer = require('../utils/serializer');

router.post(
  '/create-trade',
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({
      message: 'success',
      data:
        (await service.addTrade({
          ...req.body,
          portfolio_id: req.decodedTokenData.data.portfolio_id
        })) || {}
    });
  })
);

router.get(
  '/trades',
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({
      message: 'success',
      data: serializer.fetchUserTrades(
        await service.fetchTrades({
          ...req.query,
          portfolio_id: req.decodedTokenData.data.portfolio_id
        })
      )
    });
  })
);

router.get(
  '/portfolio',
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({
      message: 'success',
      data: serializer.fetchUserPortfolio(
        await service.fetchPortfolio({
          ...req.query,
          portfolio_id: req.decodedTokenData.data.portfolio_id
        })
      )
    });
  })
);

router.get(
  '/returns',
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({
      message: 'success',
      data: serializer.fetchUserReturns(
        await service.fetchReturns({
          ...req.query,
          portfolio_id: req.decodedTokenData.data.portfolio_id
        })
      )
    });
  })
);

router.put(
  '/trade',
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({
      message: 'success',
      data:
        (await service.updateTrade({
          ...req.body,
          portfolio_id: req.decodedTokenData.data.portfolio_id
        })) || {}
    });
  })
);

router.delete(
  '/trade',
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({
      message: 'success',
      data:
        (await service.updateTrade({
          ...req.body,
          portfolio_id: req.decodedTokenData.data.portfolio_id,
          delete_trade: true
        })) || {}
    });
  })
);

module.exports = router;
