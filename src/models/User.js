const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allownull: false
        },
        name:{
            type: DataTypes.STRING,
            allownull: false,
        },
        surname:{
            type: DataTypes.STRING,
            allownull: false
        },
        nickname:{
            type: DataTypes.STRING,
            allownull:false
        },
        email:{
            type: DataTypes.STRING,
            allownull:false
        },
        phone_number:{
            type: DataTypes.INTEGER,
            allownull:false
        },
        date_of_Birth:{
            type: DataTypes.DATE,
            allownull: false
        },
        address:{
            type: DataTypes.STRING,
            allownull:false
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            allownull:false
        },
        isBanned:{
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allownull: false
        }
    },{timestamps: false})
}