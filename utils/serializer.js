const config = require('config');

module.exports = {
  fetchUserTrades: function (transactions) {
    let formattedRows = [];
    if (Array.isArray(transactions.rows) && transactions.rows.length) {
      formattedRows = transactions.rows.map((trade) => {
        return {
          type_of_order: trade.type_of_trade,
          stock: trade.security && trade.security.ticker_symbol,
          price: trade.price,
          quantity: trade.quantity,
          id: trade.id
        };
      });
    }
    return {
      count: transactions.count,
      rows: formattedRows
    };
  },
  fetchUserPortfolio: function (portfolio) {
    let formattedRows = [];
    if (Array.isArray(portfolio.rows) && portfolio.rows.length) {
      formattedRows = portfolio.rows.map((user_portfolio) => {
        return {
          avg_buy_price: user_portfolio.avg_buy_price,
          stock: user_portfolio.security && user_portfolio.security.ticker_symbol,
          quantity: user_portfolio.quantity
        };
      });
    }
    return {
      count: portfolio.count,
      rows: formattedRows
    };
  },
  fetchUserReturns: function (portfolio) {
    let totalReturns = 0;
    if (Array.isArray(portfolio) && portfolio.length) {
      portfolio.forEach((user_portfolio) => {
        totalReturns +=
          (config.get('currentPrice') - user_portfolio.avg_buy_price) * user_portfolio.quantity;
      });
    }
    return totalReturns;
  }
};
