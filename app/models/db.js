const mysql = require("mysql");
const dbconfig = require("../config/db.config.js");

//Create a connection to the database 
const connecton = mysql.createConnection({
    host : dbconfig.HOST,
    user : dbconfig.USER,
    password : dbconfig.PASSWORD,
    database : dbconfig.DATABASE
});

//Open the Mysql connection 
connecton.connect(error => {
    if(error)throw error;
    console.log("Succesfully Connected to the database. ");
});

module.exports = connecton;





