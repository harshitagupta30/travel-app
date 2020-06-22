import './styles/layout.scss';
import './styles/style.scss';
import './styles/nav.scss';
import './styles/footer.scss';
import { getDestination, getStartingDate, getReturnDate, countdown } from '../client/js/utils.js';
import { getWeatherForecast, getGeoLocation, getImageUrl } from '../client/js/request.js';

const trip = {};

/* Function called by event listener */
const performAction = async(e) => {
    e.preventDefault();

    trip.destination = getDestination();

    let geoLocation = await getGeoLocation(trip.destination);

    trip.latitude = geoLocation.results[0].geometry.lat;
    trip.longitude = geoLocation.results[0].geometry.lng;
    trip.country = geoLocation.results[0].components.country;
    trip.countryCode = geoLocation.results[0].components.country_code;

    console.log(geoLocation.results[0].geometry);

    trip.weatherForecast = await getWeatherForecast(trip.latitude, trip.longitude);

    trip.startDate = getStartingDate();
    trip.endDate = getReturnDate();

    console.log('image url', await getImageUrl(trip.destination));
}

document.getElementById('button_search').addEventListener('click', performAction);