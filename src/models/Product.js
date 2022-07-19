const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('product', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey:true,
            allownull:false
        },
        tittle: {
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
        }
    },{timestamps: false})
}