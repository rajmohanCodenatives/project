module.exports = app =>{
    const busController = require("../controllers/busController");

    var router = require("express").Router();

    //Get all bus 
    router.get("/",busController.GetAllbus);
    //Get all passenger
    router.get("/passenger",busController.GetAllpsg);
    //Get particular bus no
    router.get("/bus/:bus_no",busController.getWithBusId);
    //Get particular passenger id
    router.get('/passenger/:psg_no',busController.getWithPsgId);
    //create bus here
    router.post("/createbus",busController.CreateBus);
    //Join here here bus and passenger
    router.get("/details",busController.GetWithJoin);
    
    app.use("/bus",router)
}