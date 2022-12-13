const sql = require('./db.js');

//constructor 
const DataBase = function (bus , passenger) {
     this.bus_name = bus.bus_name,
     this.bus_start_destination = bus.bus_start_destination,
     this.bus_end_destination = bus.bus_end_destination,
     this.bus_start_destination_timing = bus.bus_start_destination_timing,
     this.bus_reach_destination_time = bus.bus_reach_destination_time,
     this.bus_type = bus.bus_type,
     this.bus_driver_name = bus.bus_driver_name,
     this.bus_counter_name = bus.bus_counter_name
    //  this.bus_no = passenger.bus_no,
    //  this.ps_first_name = passenger.ps_first_name,
    //  this.ps_last_name = passenger.ps_last_name,
    //  this.ps_age = passenger.ps_age,
    //  this.amount = passenger.amount,
    //  this.aadhaar_no = passenger.aadhaar_no
};

//Get all bus 
DataBase.getAllbus = (bus_name , result) =>{
    let query = "SELECT bus_no, bus_name, bus_start_destination, bus_end_destination, bus_start_destination_timing, bus_reach_destination_time, bus_type, bus_driver_name, bus_counter_name, status, created_At, updated_At FROM  bus";
    if(bus_name){
        query += `WHERE title LIKE '%${bus_name}%'`
    }
    sql.query(query, (err , res )=>{
        if (err) {  
            console.log("Error ", err);
            result(null , err);
            return;
        }
        console.log("Bus list here: ",res);
        result(null , res)
    });
};

//Get all psg
DataBase.getAllpsg = (ps_first_name , result) =>{
    let query = "SELECT passenger_no, bus_no, ps_first_name, ps_last_name, ps_age, amount, aadhaar_no, status, create_At, updated_At     FROM  passenger";
    if(ps_first_name){
        query += `WHERE title LIKE '%${ps_first_name}%'`
    }
    sql.query(query, (err , res )=>{
        if (err) {  
            console.log("Error ", err);
            result(null , err);
            return;
        }
        console.log("psg list here: ",res);
        result(null , res)
    });
};
//Get with bus no
DataBase.getByNo = (no , result) =>{
    sql.query(`SELECT bus_no, bus_name, bus_start_destination, bus_end_destination, bus_start_destination_timing, bus_reach_destination_time, bus_type, bus_driver_name, bus_counter_name, status, created_At, updated_At FROM bus WHERE bus_no = ${no}`,(err , res) =>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          if (res.length) {
            console.log("found bus: ", res[0]);
            result(null, res[0]);
            return;
          }
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
    }) 
}
//Get with psg no
DataBase.getByPsgNo = (no , result) =>{
    sql.query(`SELECT passenger_no, bus_no, ps_first_name, ps_last_name, ps_age, amount, aadhaar_no, status, create_At, updated_At FROM passenger WHERE passenger_no = ${no}`,(err , res)=>{
        if(err){
            console.log("error ", err);
            result(err , null);
            return;
        }
        if (res.length){
            console.log("found psg: ", res[0]);
            result(null , res[0]);
            return;
        }
        result({ Kind : "Not found" },null);
    })
}
//Create bus
DataBase.create = (newbus , result ) =>{
    sql.query("INSERT INTO bus SET ?",newbus , (err , res) =>{
        if(err){
            console.log("error: ",err);
            result(err , null);
            return;
        }
        console.log("create bus details: ",{ bus_no: res.insertbus_id, ...newbus });
        result(null , { bus_no: res.insertbus_id, ...newbus })
    });
};
//Join bus and passenger here
DataBase.joinQuery = (join , result)=>{
    let query ="SELECT bus.bus_no,bus.bus_name,bus.bus_start_destination,bus.bus_start_destination_timing,bus.bus_type,passenger.ps_first_name,passenger.ps_last_name from bus INNER join passenger ON bus.bus_no = passenger.bus_no;"
    if(join){
        query +=`WHERE title LIKE '%${join}'`
    }
    sql.query(query, (err , res) =>{
        if(err){
            console.log("Error ", err);
            result(null , err);
            return;
        }
        console.log("Join query here",res);
        result(null , res)
    });
};

module.exports = DataBase;