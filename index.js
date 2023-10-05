// require('dotenv').config();

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

const currentTime = new Date();
const date = currentTime.getDate();

const currentDay = days[currentTime.getDay()];
const currentMonth = month[currentTime.getMonth()];
const currentYear = currentTime.getFullYear();

let currentHour = currentTime.getHours();
let currentMinute = currentTime.getMinutes();

if (currentHour < 10 ) {
  currentHour = `0${currentHour}`
}

if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`
}

const dateElement = document.querySelector("#date-time")
dateElement.innerHTML = `${currentDay} ${date} ${currentMonth} ${currentYear} <br /> ${currentHour}:${currentMinute}`

// ============================

const temperatureElement = document.querySelector(".temp")
const celsiusLink = document.querySelector("#celsiusButton")
const fahrenheitLink = document.querySelector("#fahrenheitButton")
let currentUnit = 'celsius'
let celsius = parseFloat(temperatureElement.textContent)

const convertToFahrenheit = (event) => {
  event.preventDefault();

  if (currentUnit === 'celsius') {
    currentUnit = 'fahrenheit'
    celsiusLink.classList.remove("active")
    fahrenheitLink.classList.add("active")

    celsius = parseFloat(temperatureElement.textContent)
    const fahrenheitTemperature = (celsius * 9/5) + 32
    temperatureElement.textContent = fahrenheitTemperature.toFixed(2)
  }
}

const convertToCelsius = (event) => {
  event.preventDefault()

  if (currentUnit === 'fahrenheit') {
    currentUnit = 'celsius'
    celsiusLink.classList.add("active")
    fahrenheitLink.classList.remove("active")

    temperatureElement.textContent = celsius.toFixed(2)
  }
}
celsiusLink.addEventListener("click", convertToCelsius)
fahrenheitLink.addEventListener("click", convertToFahrenheit)

// ============================
const updateSpeed = (response) => {
  const windSpeed = response.data.wind.speed
  const speed = document.querySelector(".speed")
  speed.innerHTML = `${windSpeed}`
}

const updateHumidity = (response) => {
  const humidity = response.data.main.humidity
  const humid = document.querySelector(".humid")
  humid.innerHTML = `${humidity}`
}

const updateDescription = (response) => {
  const description = response.data.weather[0].description
  const h3 = document.querySelector("#weatherDescription")
  h3.innerHTML = `${description}`
}

const updateIcon = (response) => {
  const iconImage = response.data.weather[0].icon
  const iconDesciption = document.querySelector("#icon")
  iconDesciption.setAttribute("src", `https://openweathermap.org/img/wn/${iconImage}@2x.png`)
  iconDesciption.setAttribute("alt", response.data.weather[0].description)
}

const updateTemperature = (response) => {
  const temperature = response.data.main.temp
  const h5 = document.querySelector(".temp")
  h5.innerHTML = `${temperature}`
}

const updateLocation = (response) => {
  const location = response.data.name.toUpperCase()
  const h1 = document.querySelector("#city");
  h1.innerHTML = `${location}`
}

const displayTemperature = (response) => {
  updateLocation(response)
  updateTemperature(response)
  updateDescription(response)
  updateSpeed(response)
  updateHumidity(response)
  updateIcon(response)
}

// get the city & form the url
const searchCity = (city) => {
  const units = "metric";
  const apiKey="8fc0ddf73b13e506e70c74c535dae862"
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

// get the value in the form
const search = (event) => {
  event.preventDefault();
  const cityValue = document.querySelector("#cityInput").value;
  searchCity(cityValue)
}

const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", search)

searchCity("Malaysia")
