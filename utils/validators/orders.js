const { check, body, buildCheckFunction, query } = require('express-validator');
const config = require('config');
const validators = {
  post: {
    '/create-trade': [
      body('type')
        .exists()
        .withMessage('field is required')
        .isIn(Object.values(config.get('trade.type')))
        .withMessage(`type must consist ${Object.values(config.get('trade.type'))}`),
      body('stock_id')
        .exists()
        .withMessage('field is required')
        .isInt()
        .withMessage('field must be of type integer'),
      body('price')
        .exists()
        .withMessage('field is required')
        .isFloat({ gt: 0 })
        .withMessage('field must be of type integer'),
      body('quantity')
        .exists()
        .withMessage('field is required')
        .isFloat({ gt: 0 })
        .withMessage('field must be of type integer')
    ]
  }
};

module.exports = validators;