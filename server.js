// Server file - Remember hierarchy, server file typically exists on the same level as the website folder

//  GLOBAL vars: Initialize express,  middle ware, and server
const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const cors       = require("cors");
const port       = 8000;
const server     = app.listen(port, listening);

app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


function listening(){
    console.log(`The server is running.`);
    console.log(`Localhost: ${port}.`);
};

//  Set data endpoint for routes
const projectData = {};

/////////////////////////////////////////////
/////////////////////////////////////////////
// GET ROUTE
/////////////////////////////////////////////
/////////////////////////////////////////////

app.get("/all", returnProjectData);

function returnProjectData(req, res){
    console.log(`sending prooject data:`);
    res.send(projectData);
}

/////////////////////////////////////////////
/////////////////////////////////////////////
// POST route
/////////////////////////////////////////////
/////////////////////////////////////////////


app.post("/addData", addData);

function addData(req, res){
    // Create data var to hold req.body
    let data = req.body;

    //  Post new properties/types for JS object endpoint "projectData"
    projectData['temp'] = data.temp;
    projectData['userFeeling'] = data.userFeeling;
    projectData['date'] = data.date;
    projectData['time'] = data.time;

    //  Send response back to the the endpoint
    res.send(projectData);
    console.log(data);
};

