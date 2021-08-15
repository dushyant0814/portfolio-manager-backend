const { body, query } = require('express-validator');
const config = require('config');

const validators = {
  post: {
    '/stock': [
      body('name').exists().withMessage('field is required'),
      body('ticker_symbol')
        .exists()
        .withMessage('field is required')
        .customSanitizer((value) => {
          if (value.length > 5) {
            throw {
              message: 'field cannot exceed length of 5 characters',
              status: config.get('httpStatusCodes.badRequest')
            };
          }
          return value;
        })
    ]
  },
  get: {
    '/list': [
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
    ]
  }
};

module.exports = validators;
