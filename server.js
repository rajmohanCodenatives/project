const express = require("express");
const cors = require("cors");

const app = express();

var corsOption = {
    origin : "http://localhost:9000"
};

app.use(cors(corsOption));

//parse request of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//simple route
app.get("/", (req ,res)=>{
    res.json({ message: "Welcome to sk application "});
});

require("./app/routes/routes.js")(app)

//set port,listen for request 
const PORT = process.env.PORT || 9000;
app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}.`);
});
