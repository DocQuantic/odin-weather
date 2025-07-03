class DayForecast {
    constructor(date, currentTemp, minTemp, maxTemp, wind, icon){
        this.date = date
        this.currentTemp = currentTemp
        this.minTemp = minTemp
        this.maxTemp = maxTemp
        this.wind = wind
        this.icon = icon
    }
}

export async function fetchWeatherAPI(location, unit){
    try{
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=Z2MKQNK689WHSRQ7HELR6JHJ8&contentType=json`)
        let json = await response.json()
        return json
    } catch(error) {
        console.error(error)
    }
}

export function extractForecastFromJSON(json){
    const days = json.days

    let forecast = [];
    days.forEach((day) => {
        const dayForecast = new DayForecast(day.temp, day.tempmin, day.tempmax, day.windspeed, day.icon);
        forecast.push(dayForecast) 
    })
}