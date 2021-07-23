const {sequelize, Sequelize} = require(".");

module.exports= (sequelize, Sequelize) =>{
    const Users = sequelize.define("users",{
        name: {
            type: Sequelize.STRING
        },
        lastname:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        }
        ,
        photo:{
            type: Sequelize.STRING
        }
    });
    return Users;
}

