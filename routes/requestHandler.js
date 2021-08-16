const path = require('path');
const config = require('config');
const funcs = {};
const fs = require('fs');
const { validationResult } = require('express-validator');
let validators = {};

/*
with the help of this function we can re-direct validations of a particular route to their respective
file in utils/validator folder, will also handle writing try-catches inside functions
*/

funcs.handleRequest = (func) => async (req, res, next) => {
  let endPointName = req._parsedUrl.pathname.toLowerCase();
  let protocolName = req.method.toLowerCase();
  let baseUrl = req.baseUrl.toLowerCase();
  try {
    if (!validators[baseUrl]) {
      if (fs.existsSync(path.join(__dirname, '..', 'utils', 'validators', `${baseUrl}.js`))) {
        validators[baseUrl] = require(path.join(
          __dirname,
          '..',
          'utils',
          'validators',
          `${baseUrl}.js`
        ));
      }
    }
    // To check if new validators are injected and check if validators exists for specified path
    if (
      (!validators[baseUrl] ||
        !validators[baseUrl][protocolName] ||
        !validators[baseUrl][protocolName][endPointName]) &&
      fs.existsSync(path.join(__dirname, '..', `${baseUrl}/validators.js`))
    ) {
      validators[baseUrl] = require(path.join(__dirname, '..', `${baseUrl}/validators.js`));
    }

    //Checking existence of the End point
    if (
      !(
        validators &&
        validators[baseUrl] &&
        validators[baseUrl][protocolName] &&
        validators[baseUrl][protocolName][endPointName]
      )
    )
      throw {
        msg:
          `No schema found for ${endPointName} of ${protocolName} protocol of ${baseUrl} route file.` +
          ` A route ${endPointName} has to be declared in utils/validators/${baseUrl}.js for ` +
          `${protocolName} protocol`,
        location: path.basename(__filename),
        status: config.get('httpStatusCodes.badRequest')
      };
    //Validating the request
    await Promise.all(
      validators[baseUrl][protocolName][endPointName].map((validation) => validation.run(req))
    );
    validationResult(req).throw();
    //redirecting it to its respective route to proceed ahead to the service file via route
    await func(req, res, next);
  } catch (e) {
    // If express-validator has thrown the error, then injecting the status code with this trick
    if (e && e.errors && e.errors.length) e.status = config.get('httpStatusCodes.badRequest');

    return res
      .status((e && e.status) || config.get('httpStatusCodes.internalServerError'))
      .send(
        e && (e.hasOwnProperty('message') || e.hasOwnProperty('msg')) && e.hasOwnProperty('stack')
          ? { message: e.message || e.msg, stack: e.stack }
          : typeof e === `string`
          ? JSON.stringify(e)
          : e
      );
  }
};

module.exports = funcs;
