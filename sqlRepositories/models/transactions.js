/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'transactions',
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      type_of_trade: {
        type: DataTypes.ENUM('BUY', 'SELL'),
        allowNull: false
      },
      security_id_fk: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'securities',
          key: 'id'
        }
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      portfolio_id_fk: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        unique: true // 1 user 1 portfolio
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'transactions',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
};
