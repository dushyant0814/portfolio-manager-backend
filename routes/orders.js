const express = require('express');
const router = express.Router();
const service = require('../services/auth');
const requestHandler = require('./requestHandler');

router.get('/dummy', async function (req, res, next) {
  return res.status(200).send({ message: 'success' });
});

module.exports = router;
