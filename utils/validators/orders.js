const { body, query } = require('express-validator');
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
  },
  get: {
    '/trades': [
      query('offset')
        .optional()
        .customSanitizer((value) => {
          if (value) {
            return parseInt(value);
          }
        }),
      query('limit')
        .optional()
        .customSanitizer((value) => {
          if (value) {
            return parseInt(value);
          }
        })
    ],
    '/portfolio': [
      query('offset')
        .optional()
        .customSanitizer((value) => {
          if (value) {
            return parseInt(value);
          }
        }),
      query('limit')
        .optional()
        .customSanitizer((value) => {
          if (value) {
            return parseInt(value);
          }
        })
    ],
    '/returns': []
  },
  put: {
    '/trade': [
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
        .withMessage('field must be of type integer'),
      body('trade_id')
        .exists()
        .withMessage('field is required')
        .isFloat({ gt: 0 })
        .withMessage('field must be of type integer')
    ]
  },
  delete: {
    '/trade': [
      body('trade_id')
        .exists()
        .withMessage('field is required')
        .isFloat({ gt: 0 })
        .withMessage('field must be of type integer')
    ]
  }
};

module.exports = validators;
