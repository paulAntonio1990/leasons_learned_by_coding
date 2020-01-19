module.exports = (sequelize, DataTypes) => {
    return sequelize.define('repo', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [3-100]
          }
      }
    })
  }