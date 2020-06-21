const getDestination = () => {

    let destination = document.getElementById('destination').value;
    destination = destination.toLowerCase();
    destination = destination[0].toUpperCase + destination.slice(1);

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

    const daysLeft = Math.ceil((end - start) / 86400000);

    return daysLeft;
}

export { getDestination, getStartingDate, getReturnDate, countdown };