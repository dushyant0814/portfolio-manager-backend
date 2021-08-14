/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'portfolio',
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
      description: {
        type: DataTypes.STRING(400),
        allowNull: true
      },
      user_id_fk: {
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
      tableName: 'portfolio',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
};
