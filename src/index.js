import "./styles.css";
import { fetchWeatherAPI, extractForecastFromJSON } from "./Modules/weather";
import { updateUIFromForecast } from "./Modules/UI";

const forecastElement = document.querySelector(".forecast")
const citySearchForm = document.querySelector(".city-select")
const citySearchField = document.querySelector("#city")
const citySearchFieldError = document.querySelector(".error-msg")

citySearchField.addEventListener("input", () => {
        
        if(citySearchField.validity.valid){
            citySearchFieldError.textContent = "";
            citySearchFieldError.className = "error-msg";
        } else {
            showInputError();
        }
    })

citySearchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formValidity = citySearchField.checkValidity();

    if(!formValidity){
        showInputError()
        return;
    } else {
        try{
            let weatherData = await fetchWeatherAPI(citySearchField.value, "metric")
            let forecast = extractForecastFromJSON(weatherData)

            forecastElement.className = "forecast"

            updateUIFromForecast(forecast)
        } catch(error) {
            console.dir(error);
            citySearchFieldError.textContent = error.message;
            citySearchFieldError.className = "error-msg active";
        }
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
