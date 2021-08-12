/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      mobile: {
        type: DataTypes.STRING(16),
        allowNull: true
      },
      password_reset_token: {
        type: DataTypes.STRING(255),
        allowNull: true
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
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
};
