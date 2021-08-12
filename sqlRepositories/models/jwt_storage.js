/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'jwt_storage',
    {
      id: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      token: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      user_id: {
        type: DataTypes.SMALLINT,
        allowNull: true
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'jwt_storage',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      timestamps: true,
      paranoid: true
    }
  );
};
