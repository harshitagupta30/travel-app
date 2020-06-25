async function getWeatherForecast(latitude, longitude) {
    try {
        const response = await fetch('http://localhost:8080/forecast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude: latitude, longitude: longitude })
        });
        if (response.ok) {
            const jsonRes = await response.json();
            // console.log(jsonRes);
            return jsonRes;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getImageUrl(destination, country) {
    try {
        const response = await fetch('http://localhost:8080/image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination: destination, country: country })
        });
        if (response.ok) {
            const jsonRes = await response.json();
            // console.log(jsonRes);
            return jsonRes.hits[0].largeImageURL;
        }
    } catch (error) {
        console.log(error);
    }

}

async function getGeoLocation(destination) {
    try {
        const response = await fetch('http://localhost:8080/coordinates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination: destination })
        });
        if (response.ok) {
            const jsonRes = await response.json();
            // console.log(jsonRes);
            return jsonRes;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getCountryInfo(countryCode) {
    const endpoint = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const jsonRes = await response.json();
            return {
                name: jsonRes.name,
                flag: jsonRes.flag
            }
        }
    } catch (error) {
        console.log(error);
    }
}


export { getWeatherForecast, getGeoLocation, getImageUrl, getCountryInfo };