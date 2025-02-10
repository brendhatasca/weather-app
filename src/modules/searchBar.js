import { Country, State, City } from 'country-state-city';

const usa = State.getStatesOfCountry("BR");
const santaC = City.getCitiesOfCountry("BR")
const countries = Country.getAllCountries();

function getLocation() {
    const searchBar = document.getElementById('location-search-bar');

    const location = searchBar.value
    .replace(/\s/g, "")
    .split(",");

    return location;
}

function populateDropdownMenu() {
    const searchBar = document.getElementById("location-search-bar");
    const dropdown = document.getElementById("dropdown")
    const query = searchBar.value;

    console.log(query)
}

export { getLocation, populateDropdownMenu }