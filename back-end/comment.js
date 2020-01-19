module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        lineNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            },
            setValue(value) {
                this.setDataValue('lineNo', value.toLowerCase())
            }
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [3-2000]
          }
      }
    })
  }