const express = require('express');
const authRoutes = require('./auth');
const auth = require('../middlewares/auth');
const orderRoutes = require('./orders');
const sercurityRoutes = require('./security');
const router = express.Router();

router.use('/health', (req, res) => {
  return res.status(200).send({
    message: 'OK'
  });
});
router.use('/auth', authRoutes);
router.use('/security', sercurityRoutes);
router.use('/orders', auth, orderRoutes);
router.use(function (req, res) {
  let path = req._parsedUrl.pathname.toLowerCase();
  let splittedPath = path.split('/');
  let route = splittedPath[1];
  let endPoint = splittedPath[2];
  res.status(404).send({
    message:
      `Endpoint '${endPoint}' not found in ${route}.js in route folder, please declare it in '${route}.js' file and ` +
      `also it in 'utils/validators/${route}.js' under ${req.method} protocol`,
    status: 404,
    note: `Make sure you have defined '${endPoint}' endpoint under ${req.method} protocol in the '${route}.js' route file`
  });
});

module.exports = router;
