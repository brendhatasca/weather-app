import { fetchWeatherData, convertTemperature } from "./modules/weatherData.js";
import { createDiv } from "./modules/domHelpers.js";
import { getLocation, populateDropdownMenu } from "./modules/searchBar.js";
import './styles.css'
const { Country, State, City } = require('country-state-city');

// console.log(fetchWeatherData("toronto"));

async function getWeather(city, state) {
    const data = await fetchWeatherData(city, state);

    return {
        location: data.resolvedAddress,
        temperature: (data.weatherConditions.temperature),
        description: data.weatherConditions.conditions
    }
}

async function displayData(city, state) {
    const div = document.getElementById('display-weather-info');

    if(div.hasChildNodes()) {
        div.textContent = "";
    }

    const data = await getWeather(city, state);

    const LOCATION = createDiv(data.location, "location");
    const TEMPERATURE = createDiv(convertTemperature(data.temperature), "temperature-celsius");
    const DESCRIPTION = createDiv(data.description, "weather-description");

    TEMPERATURE.addEventListener('click', () => {
        if(TEMPERATURE.classList.contains("temperature-celsius")) {
            TEMPERATURE.classList.remove("temperature-celsius");
            TEMPERATURE.classList.add("temperature-fahrenheit");
            TEMPERATURE.textContent = `${Math.round(data.temperature)}ºF`
        } else {
            TEMPERATURE.classList.remove("temperature-fahrenheit");
            TEMPERATURE.classList.add("temperature-celsius");
            TEMPERATURE.textContent = convertTemperature(data.temperature);
        }

    })

    div.append(LOCATION, TEMPERATURE, DESCRIPTION);
}

const btn = document.getElementById('location-search-btn');
btn.addEventListener('click', (event) => {
    event.preventDefault();

    const searchBar = document.getElementById('location-search-bar');
    if(!searchBar.value.includes(",")) {
        alert("Please use following format: City, State/Province/Country");
        return;
    }

    const userInput = getLocation();
    displayData(userInput[0], userInput[1])
});
