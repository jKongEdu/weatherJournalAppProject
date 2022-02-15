// Server file - Remember hierarchy, server file typically exists on the same level as the website folder

//  Initialize express and middle ware
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// Create a local server to test, port 8080
const port = 8080;

// Create a server using the .listen() method
const server = app.listen(port, listening);

function listening(){
    console.log(`Server is running on localhost port: ${port}.`)
};

//  Set data endpoint for routes
const projectData = [];

/////////////////////////////////////////////
/////////////////////////////////////////////
// GET ROUTE
/////////////////////////////////////////////
/////////////////////////////////////////////

app.get("/", returnProjectData);

function returnProjectData(req, res){
    console.log("Sending a response back.")
    res.send(projectData);
}

/////////////////////////////////////////////
/////////////////////////////////////////////
// POST route
/////////////////////////////////////////////
/////////////////////////////////////////////

let temp, date, userResp;

app.post("/projectData", sendProjectData);

function sendProjectData(req, res){
    let newEntry = {
        temperature: req.body.temp,
        date: req.body.date,
        userResp: req.body.userRes
    }

    projectData.push(newEntry);
    console.log(newEntry);
};

