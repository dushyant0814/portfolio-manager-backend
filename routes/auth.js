const express = require('express');
const router = express.Router();
const requestHandler = require('./requestHandler');

router.post(
  '/create',
  requestHandler.handleRequest(async function (req, res, next) {
    return res.status(200).send({ message: 'Successfully created' || {} });
  })
);

module.exports = router;
