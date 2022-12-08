import {Sequelize} from "sequelize";

const db = new Sequelize('mvc','root','1234',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;