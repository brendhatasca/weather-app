
async function fetchWeatherData(city, state) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${state}?key=D5G5S4GPS7QT42FWDMF47MUSG`, 
            { mode: 'cors' }
        );

        if(!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        };

        const locationData = await response.json(); 

        return {
            resolvedAddress: locationData.resolvedAddress || 'Unknown address',
            weatherDescription: locationData.description || 'No description available',
            weatherConditions: {
                conditions: locationData.currentConditions?.conditions ?? 'N/A',
                temperature: locationData.currentConditions?.temp ?? 'N/A',
                feelsLike: locationData.currentConditions?.feelslike ?? 'N/A',
                precipitation: locationData.currentConditions?.precip ?? 'N/A',
                windSpeed: locationData.currentConditions?.windspeed ?? 'N/A'
            },
            nextCoupleWeeksForecast: locationData.days || [],
        }
    
    } catch (error) {
        console.error('Failed to fetch weather data:', error)
        return {
            resolvedAddress: 'Unknown address',
            weatherDescription: 'No description available',
            weatherConditions: {
                temperature: 'N/A',
                feelsLike: 'N/A',
                precipitation: 'N/A',
                windSpeed: 'N/A'
            },
            nextCoupleWeeksForecast: [] // returns empty array
        };
    }
}

function convertTemperature(temperature, e) {
    //     let toFah = (9/5 * temperature) + 32;
    //     let fahRounded = Math.round(toFah);
    //     let fah = `${fahRounded}ºF`
    //     return fah;
    // } 
        let toCelsius = (temperature - 32) * (5 / 9);
        let celsiusRounded = Math.round(toCelsius);
        let celsius = `${celsiusRounded}ºC`
    
        return celsius;
}

export { fetchWeatherData, convertTemperature }