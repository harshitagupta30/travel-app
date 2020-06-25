import './styles/layout.scss';
import './styles/index.scss';
import './styles/nav.scss';
import './styles/modal.scss';
import './styles/footer.scss';
import { getDestination, getStartingDate, getReturnDate, countdown, updateModal, displaySavedTrip } from '../client/js/utils.js';
import { getWeatherForecast, getGeoLocation, getImageUrl } from '../client/js/request.js';
const $ = require('jquery');

const trip = {};
let trips = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : [];
const searchBtn = document.getElementById('button_search');
const cancelBtn = document.getElementById('btn-cancel_modal');
const saveTripBtn = document.getElementById('btn-save_trip');
const deleteAllTripsBtn = document.getElementById('btn-delete_all');
const createNewTripBtn = document.getElementById('btn-add_new_trip');

/* Function called by event listener */
const performAction = async(e) => {
    e.preventDefault();

    trip.destination = getDestination();
    trip.startDate = getStartingDate();
    trip.endDate = getReturnDate();
    if (trip.destination !== '' && trip.startDate !== '' && trip.endDate !== '' && (trip.startDate < trip.endDate)) {
        const geoLocation = await getGeoLocation(trip.destination);
        trip.latitude = geoLocation.results[0].geometry.lat;
        trip.longitude = geoLocation.results[0].geometry.lng;
        trip.country = geoLocation.results[0].components.country;
        trip.countryCode = geoLocation.results[0].components.country_code;
        trip.weatherForecast = await getWeatherForecast(trip.latitude, trip.longitude);
        trip.image = await getImageUrl(trip.destination, trip.country);
        updateModal(trip);
    } else if (trip.startDate > trip.endDate) {
        alert('Return date should be after the start date');
    } else {
        alert('Please enter the destination, start date and return date');
    }

}

const handleSave = async(e) => {
    e.preventDefault();
    trips.push(trip);
    localStorage.setItem('trips', JSON.stringify(trips));
    window.location.href = 'saved-trips.html';
}

const closeModal = () => {
    $('.mask').removeClass('active');
}

$('.close, .mask').on('click', () => {
    closeModal();
});

if (searchBtn) {
    searchBtn.addEventListener('click', performAction);
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
}

if (saveTripBtn) {
    saveTripBtn.addEventListener('click', handleSave);
}

if (createNewTripBtn) {
    createNewTripBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

if (deleteAllTripsBtn) {
    deleteAllTripsBtn.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        closeModal();
    }
});

if (window.location.href.includes('trips')) {
    let trips = JSON.parse(window.localStorage.getItem('trips'));
    if (trips) {
        trips.forEach(trip => {
            displaySavedTrip(trip);
        });
    }
}