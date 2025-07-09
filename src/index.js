import "./styles.css";
import { fetchWeatherAPI, extractForecastFromJSON } from "./Modules/weather";
import { updateUIFromForecast } from "./Modules/UI";

let weatherData = await fetchWeatherAPI("Villenave d'Ornon", "metric")
console.log(weatherData)

let forecast = extractForecastFromJSON(weatherData)
console.log(forecast);

updateUIFromForecast(forecast)

const citySearchForm = document.querySelector(".city-select")
const citySearchField = document.querySelector("#city")
const citySearchFieldError = document.querySelector(".error-msg")

citySearchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formValidity = citySearchField.checkValidity();

    if(!formValidity){
        showInputError()
        return;
    } else {
        let weatherData = await fetchWeatherAPI(citySearchField.value, "metric")
        let forecast = extractForecastFromJSON(weatherData)

        updateUIFromForecast(forecast)
    }
})

function showInputError() {
    if(citySearchField.validity.valueMissing){
        citySearchFieldError.textContent = "You need to enter a city name";
    } else if(citySearchField.validity.patternMismatch){
        citySearchFieldError.textContent = "City name is not valid. It must contain only letters, spaces or -";
    }

    citySearchFieldError.className = "error-msg active";
}
