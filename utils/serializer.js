module.exports = {
  fetchUserTrades: function (transactions) {
    let formattedRows = [];
    if (Array.isArray(transactions.rows) && transactions.rows.length) {
      formattedRows = transactions.rows.map((trade) => {
        return {
          type_of_order: trade.type_of_trade,
          stock: trade.security && trade.security.ticker_symbol,
          price: trade.price,
          quantity: trade.quantity
        };
      });
    }
    return {
      count: transactions.count,
      rows: formattedRows
    };
  }
};
