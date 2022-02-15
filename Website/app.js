/////////////////////////////////////////////
/////////////////////////////////////////////
//  API creds, key, and variable
/////////////////////////////////////////////
/////////////////////////////////////////////

// Global vars
const baseURL = ("http://api.openweathermap.org/geo/1.0/zip?zip="); 
const apiKey = "&appid=cc9984e2da1ecc4ae3777c24cc1439bc";
let userZip;

//  Event listener for API call
document.getElementById('generate').addEventListener('click', performAction);

//  Event listener callback function
function performAction(event){

    // re-assign uesrZip var 
    userZip = document.getElementById('zip').value;

    // test to ensure zipcode is being captured
    console.log(`The user entered zipcode: ${userZip}`);

    // call getWeatherData function with params
    getWeatherData(baseURL,userZip,apiKey);
}

//  Async function to fetch() / GET request for data from the OpenWeatherMap API

const getWeatherData = async(baseURL,userZip,apiKey) => {
    const reqData = await fetch(baseURL+userZip+apiKey);
    try{
        const data = await reqData.json();
        console.log(data);
    } catch (error){
        console.log(`ERROR: ${error}.`)
    }
};