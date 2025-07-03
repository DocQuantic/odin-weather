import "./styles.css";
import { fetchWeatherAPI } from "./Modules/weather";

console.log(await fetchWeatherAPI("Bordeaux", "metric"));
