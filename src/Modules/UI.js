import { format } from 'date-fns'

function getUIElements(){
    const cityName = document.querySelector(".city-name");
    const today = document.querySelector(".today");
    const nextDays = document.querySelectorAll(".day");

    const elements = {
        cityName: cityName,
        today: today,
        nextDays: nextDays
    }

    return elements;
}

async function setDayWeather(dayElement, weather, isToday){
    const currentTempElement = dayElement.querySelector(".current-temp");
    const minMaxTempElement = dayElement.querySelector(".min-max");
    const windElement = dayElement.querySelector(".wind");

    currentTempElement.textContent = `${weather.currentTemp} °C`;
    minMaxTempElement.textContent = `${weather.minTemp}/${weather.maxTemp} °C`;
    windElement.textContent = `${weather.wind} km/h`;

    if(isToday){
        const conditionsElement = dayElement.querySelector(".condition");
        conditionsElement.textContent = weather.description;
    } else {
        const dateElement = dayElement.querySelector(".date")
        dateElement.textContent = format(new Date(weather.date), "eeee") 
    }

    const iconElement = dayElement.querySelector(".icon > img");
    try{
        let response = await import(`../icons/${weather.icon}.png`);
        let iconUrl = await response.default;
        iconElement.src = iconUrl;
    } catch(error) {
        console.error(error)
        console.error("Condition icon not found. Fallback icon used instead.")

        let response = await import(`../icons/clear-day.png`);
        let iconUrl = await response.default;
        iconElement.src = iconUrl;
    }
}

export function updateUIFromForecast(forecast) {
    const elements = getUIElements();

    elements.cityName.textContent = forecast[0].address;
    
    setDayWeather(elements.today, forecast[0], true)

    elements.nextDays.forEach((day, index) => {
        setDayWeather(day, forecast[index+1], false)
    })
}