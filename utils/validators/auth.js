const { check, body, buildCheckFunction, query } = require('express-validator');
const config = require('config');
const validators = {
  post: {
    '/': [
      body('name').exists().withMessage('name key is missing'),
      body('email').exists().withMessage('email key is missing')
    ]
  }
};

module.exports = validators;
