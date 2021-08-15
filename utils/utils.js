const config = require('config');

module.exports = {
  createPortfolioModel: function ({ portfolioInstance, newTrasaction }) {
    let model = {};
    if (newTrasaction.type === config.get('trade.type.BUY')) {
      model.avg_buy_price =
        (portfolioInstance.avg_buy_price * portfolioInstance.quantity +
          newTrasaction.price * newTrasaction.quantity) /
        (portfolioInstance.quantity + newTrasaction.quantity);
      model.quantity = portfolioInstance.quantity + newTrasaction.quantity;
    } else {
      model.quantity = portfolioInstance.quantity - newTrasaction.quantity;
      if (model.quantity < 0) {
        throw {
          message: `Invalid order placed,quantity of shares in the portfolio cannot be negative`,
          status: config.get('httpStatusCodes.badRequest')
        };
      }
    }
    return model;
  },
  getLastPortfolioInfo: function ({ portfolioInstance, lastTransactionInstance }) {
    let model = {};
    model.quantity = portfolioInstance.quantity - lastTransactionInstance.quantity;
    model.avg_buy_price =
      (portfolioInstance.avg_buy_price * portfolioInstance.quantity -
        lastTransactionInstance.price * lastTransactionInstance.quantity) /
      model.quantity;
    return model;
  }
};
