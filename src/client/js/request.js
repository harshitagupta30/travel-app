async function getWeatherForecast(latitude, longitude) {
    try {
        const response = await fetch('http://localhost:8080/forecast', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude: latitude, longitude: longitude })
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

async function getImageUrl(destination) {
    try {
        const response = await fetch('http://localhost:8080/image', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ destination: destination })
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

async function getGeoLocation(destination) {
    try {
        const response = await fetch('http://localhost:8080/coordinates', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ destination: destination })
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


export { getWeatherForecast, getGeoLocation, getImageUrl };