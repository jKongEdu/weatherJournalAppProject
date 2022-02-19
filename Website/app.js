/////////////////////////////////////////////
/////////////////////////////////////////////
//  API creds, key, and variable
/////////////////////////////////////////////
/////////////////////////////////////////////

// Global vars
const baseURL = ("http://api.openweathermap.org/data/2.5/weather?zip="); 
// const baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";
// const baseURL = "http://api.openweathermap.org/data/2.5/weather?"
const apiKey = "&appid=cc9984e2da1ecc4ae3777c24cc1439bc";
let userZip, userTemp, userFeeling;

//  Event listener for API call
document.getElementById('generate').addEventListener('click', performAction);

//  Event listener callback function
function performAction(event){

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
        
        //  User temp is returned from API call as Kelvin, use function to conver to Farenheit
        convertTemp(userTemp);

        // IF statement to alert user of no zip code but returned response from API
        if (data.cod == "400"){
            alert('Please enter a valid zip code');
            console.log(`There was a bad request and the API could not return data`)
        }

        postData('/addData', {temp:temp, userFeeling:userFeeling});

    });
}

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
    console.log(tempInF);
    console.log(`The current temperature is ${tempInK}K OR ${tempInF}F`);
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
