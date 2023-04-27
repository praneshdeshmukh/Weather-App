const apikey = "7f87e635de64b0dd6904bcb35452a777"
// const apiKey = '1a88bad1187ec4b382d7cef114365e79'
const weatherDataEl = document.getElementById("weather-data")
const cityInputEl = document.getElementById("city")
const formEl = document.querySelector('form')
// --------------------------------------

formEl.addEventListener("submit", (event) => {
    event.preventDefault(); // stops page from refreshing when submit button is triggered
    const cityValue = cityInputEl.value // to have access to whatever user inputs
    // console.log(cityValue);
    getWeatherData(cityValue)
    async function getWeatherData(cityValue) {
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
            if(!response.ok) {
                throw new Error("Server issue...")
            } 
            const data = await response.json()
            // console.log(data);

            const temperature = Math.round(data.main.temp)              
            const description = data.weather[0].description
            const iconn = data.weather[0].icon
            const details = [
                `Feels like : ${Math.round(data.main.feels_like)}`,
                `Humidity : ${Math.round(data.main.humidity)}%`,
                `wind speed : ${data.wind.deg} m/s`,
            ]
            // console.log(details);
            weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${iconn}.png" alt="sun icon">`
            weatherDataEl.querySelector('.temperature').textContent = `${temperature}°C`
            weatherDataEl.querySelector('.description').textContent = description
            weatherDataEl.querySelector('.details').innerHTML = 
            details.map((detail) => 
                `<div>${detail}</div>`

            ).join("")
        }
        catch (error) {
            weatherDataEl.querySelector(".icon").innerHTML = ""
            weatherDataEl.querySelector('.temperature').textContent = ""
            weatherDataEl.querySelector('.description').textContent = "Invalid input, please try again"
            weatherDataEl.querySelector('.details').innerHTML = ""
        }
    }
})
        
