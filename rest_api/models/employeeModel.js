import {Sequelize} from "sequelize";
import db from "../config/Database.js";


    const {DataTypes} = Sequelize;
    const User = db.define('emp_details',{
    name: DataTypes.STRING(225),
    last_name: DataTypes.STRING(225),
    destination:DataTypes.STRING(225),
    salary:DataTypes.DECIMAL(10,2),
    status:DataTypes.STRING(7),
    // deletedAt:DataTypes.STRING(50)
},{
    paranoid: true
});


export default User;

// (async()=>{
//     await db.sync();
// })();