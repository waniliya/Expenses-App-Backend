import { Sequelize } from "sequelize";      
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('user', {
    uuid:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
    },
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    income:{
        type:DataTypes.DECIMAL
    }
},  {
    freezeTableName: true
});

export default Users;