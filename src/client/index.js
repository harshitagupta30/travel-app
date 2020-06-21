import './styles/layout.scss';
import './styles/style.scss';
import './styles/nav.scss';
import './styles/footer.scss';

/* Global Variables */
const baseUrlLocation = 'https://api.opencagedata.com/geocode/v1/json';
const baseUrlWeather = 'https://api.weatherbit.io/v2.0/current';
const apiKeyLocation = 'e21fd36ca7df46e194159bc575d50e08'; // Personal API Key for OpenWeatherMap API
const apiKeyWeather = '62596058ff9e436291faa2134f2308f6';
//https://pixabay.com/api/?key=17136304-c1a68e17b3a73635b5ab150c1&q=yellow+flowers&image_type=photo

document.getElementById('button_search').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();

    //get user input
    const country = document.getElementById('country').value;

    if (country !== '') {
        getCountryData(baseUrl, country, apiKey)
            .then(function(data) {
                // add data to POST request
                https: //api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY
                    console.log('data', data.results[0].components.country, data.results[0].components.city, data.results[0].geometry.lat, data.results[0].geometry.lng);
            }).catch(function(error) {
                console.log(error);
                alert('The country is invalid. Try again');
            });
    }
}

/* Function to GET Web API Data*/
const getCountryData = async(baseUrl, country, apiKey, type) => {
    // res equals to the result of fetch function
    let res;
    if (type === 'weather') {
        res = await fetch(`${baseUrl}?=${country}&key=${apiKey}`);
    } else {
        res = await fetch(`${baseUrl}?q=${country}&key=${apiKey}`);
    }

    try {
        // data equals to the result of fetch function
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('error', error);
    }
};