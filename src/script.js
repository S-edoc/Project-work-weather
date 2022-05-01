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

  let currentDateTime = `${currentDay} ${currentMonth} ${currentDate}, ${currentYear} </br> Last Updated ${currentHour}:${currentMinute}`;
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

function formatTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let timeDisplay = `${hour}:${minutes} `;
  return timeDisplay;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecastInfo = document.querySelector("#forecast-weather");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastValue, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 forecast-info-container">
            <div class="card">
              <div class="card-body">
                <div class="forecast-day-name" id="forecast-day">${formatDay(
                  forecastValue.dt
                )}</div>
                <img src= "http://openweathermap.org/img/wn/${
                  forecastValue.weather[0].icon
                }@2x.png"/>
                <div class="forecast-temp-range">
                  <span class="forecast-minimum" id="forecast-minimum-temp"
                    >${Math.round(forecastValue.temp.min)}°</span
                  >
                  |
                  <span class="forecast-maximum" id="forecast-maximum-temp"
                    >${Math.round(forecastValue.temp.max)}°</span
                  >
                </div>
                <div>
                  <i class="fa-solid fa-umbrella"></i
                  ><span class="forecast-rain" id="forecast-prob-of-rain"
                    >${Math.round(forecastValue.pop * 100)}%</span
                  >
                </div>
              </div>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastInfo.innerHTML = forecastHTML;
  document.querySelector("#today-minimum-value").innerHTML = Math.round(
    forecast[0].temp.min
  );
  document.querySelector("#today-maximum-value").innerHTML = Math.round(
    forecast[0].temp.max
  );
  document.querySelector("#tomorrow-minimum-value").innerHTML = Math.round(
    forecast[1].temp.min
  );
  document.querySelector("#tomorrow-maximum-value").innerHTML = Math.round(
    forecast[1].temp.max
  );
  document.querySelector("#tomorrow-sunrise-time").innerHTML = formatTime(
    forecast[1].sunrise
  );
  document.querySelector("#tomorrow-sunset-time").innerHTML = formatTime(
    forecast[1].sunset
  );
  document.querySelector("#tomorrow-humidity-value").innerHTML =
    forecast[1].humidity;
  document.querySelector("#tomorrow-wind-speed").innerHTML = Math.round(
    forecast[1].wind_speed
  );
  console.log(response);
}

function retrieveForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2483b9871977b242d98bead7f2cafee3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showWeatherValues(position) {
  console.log(position);
  document.querySelector("#city-heading").innerHTML = position.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    position.data.main.temp
  )}°C`;
  celciusTemperature = position.data.main.temp;

  document.querySelector("#today-feels-like-value").innerHTML = Math.round(
    position.data.main.feels_like
  );
  document.querySelector("#today-sunrise-time").innerHTML = formatTime(
    position.data.sys.sunrise
  );
  document.querySelector("#today-sunset-time").innerHTML = formatTime(
    position.data.sys.sunset
  );
  document.querySelector("#today-wind-speed").innerHTML = Math.round(
    position.data.wind.speed
  );
  document.querySelector("#today-humidity-value").innerHTML = Math.round(
    position.data.main.humidity
  );
  let todaysWeatherIcon = document.querySelector("#todays-icon");
  todaysWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${position.data.weather[0].icon}@2x.png`
  );

  let todaysDescriptionInfo = position.data.weather[0].description;
  let todaysDescriptionSentence = document.querySelector("#todays-description");
  todaysDescriptionSentence.innerHTML = `Today's weather shows ${todaysDescriptionInfo}`;
  timeHeading.innerHTML = formatDate(dateTime);

  retrieveForecast(position.data.coord);
}
//Current time Display
let dateTime = new Date();
let timeHeading = document.querySelector("#time-current");

//City Search Display
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmission);

//Displaying Current location data
let currentButton = document.querySelector("#current-search-button");
currentButton.addEventListener("click", findPosition);

searchCity("Quezon City");
