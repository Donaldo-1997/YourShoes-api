const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('category', {
        id: {
            type: DataTypes.STRING,
            primaryKey:true,
            allownull:false
        },
        name:{
            type: DataTypes.STRING,
            allownull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allownull:false
        }
    },{timestamps: false})
}