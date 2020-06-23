import './styles/layout.scss';
import './styles/style.scss';
import './styles/nav.scss';
import './styles/footer.scss';
import { getDestination, getStartingDate, getReturnDate, countdown, updateModal } from '../client/js/utils.js';
import { getWeatherForecast, getGeoLocation, getImageUrl, getCountryInfo } from '../client/js/request.js';
const $ = require('jquery');

const trip = {};

/* Function called by event listener */
const performAction = async(e) => {
    e.preventDefault();

    trip.destination = getDestination();

    const geoLocation = await getGeoLocation(trip.destination);

    trip.latitude = geoLocation.results[0].geometry.lat;
    trip.longitude = geoLocation.results[0].geometry.lng;
    trip.country = geoLocation.results[0].components.country;
    trip.countryCode = geoLocation.results[0].components.country_code;

    const countryInfo = getCountryInfo(trip.countryCode);
    trip.countryFlag = countryInfo.flag;

    trip.weatherForecast = await getWeatherForecast(trip.latitude, trip.longitude);

    trip.startDate = getStartingDate();
    trip.endDate = getReturnDate();

    console.log('image url', await getImageUrl(trip.destination));
    $('.mask').addClass('active');
    updateModal(trip);

}

const closeModal = () => {
    $('.mask').removeClass('active');
}

$('.close, .mask').on('click', () => {
    closeModal();
});

document.getElementById('button_search').addEventListener('click', performAction);
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        closeModal();
    }
});