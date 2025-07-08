import "./styles.css";
import { fetchWeatherAPI, extractForecastFromJSON } from "./Modules/weather";
import { updateUIFromForecast } from "./Modules/UI";

let weatherData = await fetchWeatherAPI("Bordeaux", "metric")
console.log(weatherData)

let forecast = extractForecastFromJSON(weatherData)
console.log(forecast);

updateUIFromForecast(forecast)
