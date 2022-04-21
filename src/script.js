function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
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
    "December",
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentYear = date.getFullYear();

  let currentHour = String(date.getHours()).padStart(2, "0");
  let currentMinute = String(date.getMinutes()).padStart(2, "0");

  let currentDateTime = `Last Updated ${currentHour}:${currentMinute} ${currentDay} ${currentMonth} ${currentDate}, ${currentYear}`;
  return currentDateTime;
}

function searchSubmission(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar-input").value;
  searchCity(city); // to make a function we can use to display a default on load
}
function searchCity(city) {
  //link to city data
  let unit = "metric";
  let apiKey = "2483b9871977b242d98bead7f2cafee3";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiRoot}q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeatherValues);
}

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "2483b9871977b242d98bead7f2cafee3";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiRoot}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeatherValues);
}

function showWeatherValues(position) {
  console.log(position);
  document.querySelector("#city-heading").innerHTML = position.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    position.data.main.temp
  )}°C`;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    position.data.wind.speed
  );
  document.querySelector("#humidity-value").innerHTML = Math.round(
    position.data.main.humidity
  );
  let todaysDescriptionInfo = position.data.weather[0].description;
  let todaysDescriptionSentence = document.querySelector("#todays-description");
  todaysDescriptionSentence.innerHTML = `Today's weather shows ${todaysDescriptionInfo}`;
}

// function convertCelcius(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#current-temperature");
//   currentTemp.innerHTML = "23°C";
// }
// function convertFahrenheit(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#current-temperature");
//   currentTemp.innerHTML = "88°F";
// }

//Current time Display
let dateTime = new Date();
let timeHeading = document.querySelector("#time-current");
timeHeading.innerHTML = formatDate(dateTime);

//City Search Display
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmission);

//Celsius and Fahrenheit
// let tempConversionCelcius = document.querySelector("#celcius-convert");
// let tempConversionFahrenheit = document.querySelector("#fahrenheit-convert");

// tempConversionCelcius.addEventListener("click", convertCelcius);
// tempConversionFahrenheit.addEventListener("click", convertFahrenheit);

//Displaying Current location data
let currentButton = document.querySelector("#current-search-button");
currentButton.addEventListener("click", findPosition);

searchCity("Quezon City");
