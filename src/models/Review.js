const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('review', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey:true,
            allownull:false
        },
        description:{
            type: DataTypes.STRING,
            allownull: false
        },
        rating:{
            type: DataTypes.INTEGER,
            allownull: false
        }
    },{timestamps: false})
}