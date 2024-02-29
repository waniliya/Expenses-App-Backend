import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";

const { DataTypes }= Sequelize;

const Record = db.define('record',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
    },
    category:{
        type:DataTypes.STRING
    },
    nametype:{
        type:DataTypes.STRING
    },
    amount:{
        type:DataTypes.DECIMAL
    },
    userId:{
        type:DataTypes.INTEGER
    }
   
},{
    freezeTableName:true
});
Users.hasMany(Record);  //1:Many
Record.belongsTo(Users, {foreignKey: 'userId'});

export default Record;