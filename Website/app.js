/////////////////////////////////////////////
/////////////////////////////////////////////
//  API creds, key, and variable
/////////////////////////////////////////////
/////////////////////////////////////////////


// Global vars
const baseURL = ("http://api.openweathermap.org/data/2.5/weather?zip="); 
const apiKey = "&appid=cc9984e2da1ecc4ae3777c24cc1439bc";
let userZip, userTemp, userFeeling;

//  Event listener for API call
document.getElementById('generate').addEventListener('click', performAction);

//  Event listener callback function
function performAction(event){

    //  Get date for user reference
    //  Retrieve date and time stamp on generate event
    const date  = new Date();
    const day   = date.getDate();
    const month = date.getMonth()+1;
    const year  = date.getFullYear();
    const hour  = date.getHours();
    const min   = date.getMinutes();
    const minutes = doubleDigitMin(min);

    // concat all date vars
    const fullDate = (`${month}/${day}/${year}, time: ${hour}:${minutes}.`);
    console.log(fullDate);

    // re-assign uesrZip var 
    userZip = document.getElementById('zip').value;
    userFeeling = document.getElementById('feelings').value;

    // log to ensure zipcode is being captured
    console.log(`The user entered zipcode: ${userZip}`);
    console.log(`The user is feeling ${userFeeling}`);

    // call getWeatherData function with params
    getWeatherData(baseURL,userZip,apiKey)
    
    //  Chain promise (using .then() method, post data to the /addData route, add the objecct components)
    .then(function(data){
        console.log(data);
        userTemp = data.main.temp;
        //  User temp is returned from API as Kelvin, use function to convert to Farenheit
        convertTemp(userTemp); 

        //  Post temperature and userFeeling data to server
        postData('/addData', {temp:temp, userFeeling:userFeeling});
    })

    .then(function(){
        udpateUI();
    })

} ;

//  Async function to fetch() / GET request for data from the OpenWeatherMap API

const getWeatherData = async(baseURL, userZip, apiKey) => {

    // API URL call
    const res = await fetch(baseURL+userZip+apiKey);

    try {

        const data = await res.json();
        return data;

    } catch (error){

        console.log(`ERROR: ${error}.`)
    }
};

const convertTemp = function(tempInK){
    let tempInF = (tempInK - 273.15) * 9/5 + 32;
    tempInF = Math.floor(tempInF);
    console.log(`The current temperature is ${tempInF} degrees F`);
};

//  ASYNC post function to post data
const postData = async(url = '', data = {}) => {
    console.log(`Posting data: ${data}`);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData)
        return newData;
    } catch(error){
        console.log(`There is an error in the post function: ${error}`)
    }
};


//  ASYNC function to update UI, using dynamically populated data
const udpateUI = async() => {
    //  retrieve all data from endpoint
    const req = await fetch('all');

    try{
        const allData = await request.json();
        console.log(`All requested data = ${allData}`);
        // Update individual DOM elements
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.userFeeling;
    } catch(error) {
        console.log(`Error in requesting the data to update the UI: ${error}`)
    }
};

//  Date format function
const doubleDigitMin = function(min){
    if (min < 10){
        return (`0${min}`);
    } else {
        return min;
    }
};
