const $ = require('jquery');
const getDestination = () => {

    let destination = document.getElementById('destination').value;
    if (destination) {
        destination = destination.toLowerCase();
        destination = destination[0].toUpperCase() + destination.slice(1);
    }
    return destination;
}

const getStartingDate = () => {

    const startDate = document.getElementById('date_start').value.split('-');

    return startDate.join('/');
}

const getReturnDate = () => {

    const returnDate = document.getElementById('date_end').value.split('-');

    return returnDate.join('/');
}

const countdown = (startDate, endDate) => {

    const start = Date.parse(startDate);
    const end = Date.parse(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

const updateModal = (trip) => {
    $('.mask').addClass('active');
    document.querySelector('.popover-modal').style.display = 'block';
    document.querySelector('.modal-header__text').innerText = `${trip.destination}, ${trip.country}`;
    document.querySelector('.destination__img').setAttribute('src', trip.image);
    const tripStart = getTripDate(trip.startDate);
    const tripEnd = getTripDate(trip.endDate);
    const duration = countdown(trip.startDate, trip.endDate);


    document.querySelector('.destination').innerHTML = `${trip.destination}, ${trip.country}`;
    document.querySelector('.start_date').innerHTML = `${tripStart}`;
    document.querySelector('.end_date').innerHTML = `${tripEnd}`;
    document.querySelector('.duration').innerHTML = `${duration} days`;

    // Display the days left to trip
    const daysLeft = countdown(new Date(), tripStart);
    document.querySelector('.trip_countdown').innerHTML = `Your trip to ${trip.destination} is ${daysLeft} days away.`;
    // Display weather info
    showWeatherForecastElem(trip, daysLeft, tripStart);

}

const showWeatherForecastElem = (trip, daysLeft, tripStart) => {
    const weather = getWeatherInfo(trip.weatherForecast, daysLeft, tripStart);
    if (daysLeft < 7) {
        document.querySelector('.trip_weather').innerHTML = `<p class=""><b>The current weather: </b> <br/>
                                                                <span class="">Temperature: ${weather.temperature}&deg;F</span> <br/>
                                                                <span class="">${weather.summary}</span> 
                                                            </p>`;
    } else {
        document.querySelector('.trip_weather').innerHTML = `<p class=""><b>Weather forecast for then: </b> <br/>
                                                                <span class="">High - ${weather.forecastTempMax}&deg;F</span> <br/>
                                                                <span class="">Low - ${weather.forecastTempMin}&deg;F</span> <br/>
                                                                <span class="">${weather.forecastSummary}</span> 
                                                            </p>`;
    }
}
const getTripDate = (date) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const tripDate = new Date(date);
    const tripDateText = `${days[tripDate.getDay()]}, ${months[tripDate.getMonth()]} ${tripDate.getDate()}, ${tripDate.getFullYear()}`;

    return tripDateText;
}

const getWeatherInfo = (weatherForecast, daysLeft, date) => {

    const weather = {
        temperature: 0,
        summary: '',
        forecastTempMax: 0,
        forecastTempMin: 0,
        forecastSummary: ''
    };

    weather.temperature = weatherForecast.currently.temperature;
    weather.summary = weatherForecast.currently.summary;

    date = Date.parse(date);
    /**
     * Daily forecast returns forecasts for 8 days.
     * Go through the array to match the correct day
     */
    for (let i = 0; i < weatherForecast.daily.data.length; i++) {
        if (date >= weatherForecast.daily.data[i].time) {
            weather.forecastTempMax = weatherForecast.daily.data[i].temperatureMax;
            weather.forecastTempMin = weatherForecast.daily.data[i].temperatureMin;
            weather.forecastSummary = weatherForecast.daily.data[i].summary;
            break;
        }
    }
    return weather;
}

const displaySavedTrip = (trip) => {
    const tripStart = getTripDate(trip.startDate);
    const tripEnd = getTripDate(trip.endDate);
    const duration = countdown(trip.startDate, trip.endDate);
    const daysLeft = countdown(new Date(), tripStart);
    const weather = getWeatherInfo(trip.weatherForecast, daysLeft, tripStart);
    const section = document.createElement('section');

    const div = document.createElement('div');
    div.classList.add('trip');
    div.innerHTML = `<div class="modal-body left-side">
                        <img class="destination__img" src="${trip.image}" alt="Popular Image for Destination">
                    </div>
                    <div class="modal-body right-side">
                        <p><b>Trip to:</b> <span class="destination">${trip.destination}</span></p>
                        <p><b>Departure: </b> <span class="start_date">${tripStart}</span></p>
                        <p><b>Return:</b> <span class="end_date">${tripEnd}</span></p>
                        <p><b>Duration:</b> <span class="duration">${duration}</span></p>
                        <span class="trip_countdown">Your trip to ${trip.destination} is ${daysLeft} days away.</span>
                    </div>`;
    section.appendChild(div);
    document.querySelector('.saved-trips').appendChild(section);
}


export { getDestination, getStartingDate, getReturnDate, countdown, updateModal, displaySavedTrip };