const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('product', {
        title: {
            type: DataTypes.STRING,
            allownull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        model: {
            type: DataTypes.STRING,
            allownull: false
        },
        image: {
            type: DataTypes.STRING,
            allownull: false
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allownull: false
        }
    },{timestamps: false})
}