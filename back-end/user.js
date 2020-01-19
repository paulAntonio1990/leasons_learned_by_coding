module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2-30]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2-30]
            }
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [2-30]
          }
      }
    })
  }