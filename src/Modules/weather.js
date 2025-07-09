class DayForecast {
    constructor(address, date, currentTemp, minTemp, maxTemp, wind, icon, description){
        this.address = address
        this.date = date
        this.currentTemp = currentTemp
        this.minTemp = minTemp
        this.maxTemp = maxTemp
        this.wind = wind
        this.icon = icon
        this.description = description
    }
}

export async function fetchWeatherAPI(location, unit){
    try{
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&include=days%2Ccurrent&key=Z2MKQNK689WHSRQ7HELR6JHJ8&contentType=json`)
        let json = await response.json()
        return json
    } catch {
        throw new Error("Invalid city name")
    }
}

export function extractForecastFromJSON(json){
    const days = json.days

    let forecast = [];
    days.forEach((day) => {
        const dayForecast = new DayForecast(json.resolvedAddress, day.datetime, day.temp, day.tempmin, day.tempmax, day.windspeed, day.icon, day.conditions);
        forecast.push(dayForecast) 
    })

    return forecast
}