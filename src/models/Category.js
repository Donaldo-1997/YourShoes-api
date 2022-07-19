const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('category', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey:true,
            allownull:false
        },
        name:{
            type: DataTypes.STRING,
            allownull: false
        }
    },{timestamps: false})
}