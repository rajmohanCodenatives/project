const e = require("express");
const Control = require("../models/models.js");

//Get all bus details 
exports.GetAllbus = (req, res) => {
    const title = req.query.bus_title;
    Control.getAllbus(title, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "some error occurred while  retrieving list.."
            });
        else {
            let resp = {}
            resp.status = true;
            resp.msg = "get all bus";
            resp.response = data;
            res.send(resp)
        }
    })
}

//Get all passenger 
exports.GetAllpsg = (req, res) => {
    const title = req.query.passenger_title;
    Control.getAllpsg(title, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "some error occurred while retrieving list.."
            });
        else {
            let resp = {
                status: true,
                msg: "Get all passenger details",
                response: data
            }
            res.send(resp)
        }
    })
}
//Get one particular bus id
exports.getWithBusId = (req, res) => {
    Control.getByNo(req.params.bus_no, (err, data) => {
        if (err) {
            if (err.Kind === "not found") {
                res.status(404).send({
                    message: `Not found bus with no ${req.params.bus_no}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving bus with bus no " + req.params.bus_no
                });
            }
        } else {
            let resp = {}
            resp.status = true;
            resp.msg = "get all bus";
            resp.response = data;
            res.send(resp)
        }
    })
}
//Get one paricular passenger id
exports.getWithPsgId = (req, res) => {
    Control.getByPsgNo(req.params.psg_no, (err, data) => {
        if (err) {
            if (err) {
                if (err.Kind === "not found") {
                    res.status(404).send({
                        message: `Not found passenger wih no ${req.params.psg_no}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving with peassenger no " + req.params.psg_no
                    });
                }
            } 
        }else {
            let resp = {
                status: true,
                msg: "get one passenger no ",
                response: data
            }
            res.send(resp)
        }
    });
}
//Create bus details
exports.CreateBus = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty! "
        });
    }
    //Create a bus 
    const createBus = new Control({
        bus_name: req.body.bus_name,
        bus_start_destination: req.body.bus_start_destination,
        bus_end_destination: req.body.bus_end_destination,
        bus_start_destination_timing: req.body.bus_start_destination_timing,
        bus_reach_destination_time: req.body.bus_reach_destination_time,
        bus_type: req.body.bus_type,
        bus_driver_name: req.body.bus_driver_name,
        bus_counter_name: req.body.bus_counter_name
    });
    // Save bus in the database
    Control.create(createBus, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "some occurred while creating the bus "
            });
        else res.send(data);
    });
};
//Join query here
exports.GetWithJoin = (req, res) => {
    const title = req.query.join;
    Control.joinQuery(title, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving list.."
            });
        else {
            let resp = {
                status: true,
                msg: "Get join query details here",
                response: data
            }
            res.send(resp)
        }
    })
}