const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define('activities', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
        },
    difficulty: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        min: 1,
        max: 5,
          isEven(value) {
              if(value < 1 || value > 5) {
                throw new Error('Solo valores entre 1 y 5!')
                }
              }
            }
          },
    duration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    season: {
        type: DataTypes.ENUM("Autumn", "Winter", "Summer", "Spring"),
    }
    })
}