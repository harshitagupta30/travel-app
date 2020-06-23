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

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

const updateModal = (trip) => {
    const tripStart = getTripDate(trip.startDate);
    const tripEnd = getTripDate(trip.endDate);
    console.log(countdown(trip.startDate, trip.endDate));
    const daysLeft = countdown(new Date(), trip.start);
    const weather = getWeatherInfo(trip.weatherForecast, daysLeft, trip.startDate);
    console.log(tripStart, tripEnd, daysLeft, weather);
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
        forecastTemp: 0,
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
            weather.forecastTemp = weatherForecast.daily.data[i].temperatureHigh;
            weather.forecastSummary = weatherForecast.daily.data[i].summary;
            break;
        }
    }
    return weather;
}

export { getDestination, getStartingDate, getReturnDate, countdown, updateModal };