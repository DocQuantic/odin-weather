import "./styles.css";
import { fetchWeatherAPI, extractForecastFromJSON } from "./Modules/weather";

let weatherData = await fetchWeatherAPI("Bordeaux", "metric")
console.log(weatherData)

console.log(extractForecastFromJSON(weatherData));
