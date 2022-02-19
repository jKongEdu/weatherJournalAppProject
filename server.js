// Server file - Remember hierarchy, server file typically exists on the same level as the website folder

//  Initialize express and middle ware
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Create a local server to test
const port = 8000;
// Create a server using the .listen() method
const server = app.listen(port, listening);

function listening(){
    console.log(`The server is running.`)
    console.log(`Localhost: ${port}.`)
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
    console.log(`Server side code: ${data}`);

    //  Post new properties/types for JS object endpoint "projectData"
    projectData['temp'] = data.temp;
    projectData['userFeeling'] = data.userFeeling;
    projectData['date'] = data.date;

    //  Send response back to the the endpoint
    res.send(projectData);
    console.log(`projecctData = ${projectData}`);
};

