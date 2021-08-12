const { check, body, buildCheckFunction, query } = require('express-validator');
const config = require('config');
const validators = {
  post: {
    '/create': [
      body('name').exists().withMessage('name key is missing'),
      body('email').exists().withMessage('email key is missing')
    ],
    '/login': [
      body('email').exists().withMessage('email key is missing'),
      body('password').exists().withMessage('password key is missing')
    ]
  },
  delete: {
    '/logout': []
  }
};

module.exports = validators;
