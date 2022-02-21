/////////////////////////////////////////////
/////////////////////////////////////////////
//  API creds, key, and variable
/////////////////////////////////////////////
/////////////////////////////////////////////


// Global vars
const baseURL   = ("http://api.openweathermap.org/data/2.5/weather?zip="); 
const apiKey    = "&appid=cc9984e2da1ecc4ae3777c24cc1439bc" + "&units=imperial";
const date      = new Date();

//  Open Global vars
let userZip, userTemp, userFeeling, userDate, userTime;


//  Event listener for API call
document.getElementById('generate').addEventListener('click', performAction);

//  Event listener callback function
function performAction(event){

    // re-assign uesrZip, userFeeling
    userZip = document.getElementById('zip').value;
    userFeeling = document.getElementById('feelings').value;

    // call getWeatherData function with params
    getWeatherData(baseURL,userZip,apiKey)
    
    //  Chain promise (using .then() method, post data to the /addData route, add the objecct components)
    .then(function(data){

        console.log(data);

        userTemp    = data.main.temp;
        userDate    = capturedDate();
        userTime    = capturedTime();

        //  Post temp, feeling, and date/time data to server
        postData('/addData', {temp: userTemp, userFeeling: userFeeling, date: userDate, time: userTime});
    })
    
    //  Chain another promise to udpate UI AFTER posting the data to the server
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

        console.log(`ERROR: ${error}`);

    }
};


//  ASYNC post function to post data
const postData = async(url = '', data = {}) => {

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
        return newData;
    } catch(error){
        console.log(`There is an error in the post function: ${error}`)
    }
};


//  ASYNC function to update UI, using dynamically populated data
const udpateUI = async() => {
    //  retrieve all data from endpoint
    const req = await fetch('/all');

    try{
        const allData = await req.json();
        // Update individual DOM elements
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('time').innerHTML = `Time: ${allData.time}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} degree (imperial)`;
        document.getElementById('content').innerHTML = `Content: ${allData.userFeeling}`;
        console.log(allData);

    } catch(error) {
        console.log(`Error in requesting the data to update the UI: ${error}`)
    }
};



//  GLOBAL FUNCTIONS
//  Date function
const capturedDate = function(){
    const date_date     = date.getDate();
    const date_month    = date.getMonth() + 1;
    const date_year     = date.getFullYear();
    const date_capture  = (`${date_month}/${date_date}/${date_year}`);
    console.log(date_capture);
    return date_capture;
};

const capturedTime = function(){
    const time_hour24   = date.getHours();
    const time_minutes  = date.getMinutes();
    const time_hourF    = (time_hour24 < 10) ? time_hour24 : time_hour24 - 12;
    const time_minsF    = (time_minutes < 10) ? (`0${time_minutes}`):time_minutes;
    const time_capture  = (`${time_hourF}:${time_minsF}`);
    console.log(time_capture);
    return time_capture;
};


