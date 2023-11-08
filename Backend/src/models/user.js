const sequelize = require("../db")

const {DataTypes} = require("sequelize")

const user = sequelize.define("user",{
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_picture:{
        type: DataTypes.STRING,
        allowNull: true,
        
        defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    is_teacher: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
    {
        timestamps: false
    }
    )

module.exports = user;