import './styles/layout.scss';
import './styles/index.scss';
import './styles/nav.scss';
import './styles/modal.scss';
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
    trip.image = await getImageUrl(trip.destination);
    console.log('image url', await getImageUrl(trip.destination));

    updateModal(trip);

}

const handleSave = async(e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8080/save', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip: trip })
        });
        if (response.ok) {
            const jsonRes = await response.json();
            console.log(jsonRes);
            return jsonRes;
        }
    } catch (error) {
        console.log(error);
    }
}

const closeModal = () => {
    $('.mask').removeClass('active');
}

$('.close, .mask').on('click', () => {
    closeModal();
});

document.getElementById('button_search').addEventListener('click', performAction);
document.getElementById('btn-cancel_modal').addEventListener('click', closeModal);
document.getElementById('btn-save_trip').addEventListener('click', handleSave);
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        closeModal();
    }
});