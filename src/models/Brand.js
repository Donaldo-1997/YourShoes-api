const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('brand', {
       
        name:{
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