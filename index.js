function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");
  let city = searchInput.value;

  let apiKey = "6ot20ada7f719432a222baf96f0e9bb0";
  let currentWeatherapiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(currentWeatherapiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let currentTempValue = document.querySelector(".current-weather-temp-value");
  currentTempValue.innerHTML = Math.round(response.data.temperature.current);

  let currentCity = document.querySelector(".current-weather-city");
  currentCity.innerHTML = response.data.city;

  let weatherDesciption = document.querySelector("#weather-condition");
  weatherDesciption.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#windspeed-value");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;

  let date = new Date(response.data.time * 1000);
  let dateAndTime = document.querySelector("#date-and-time");
  dateAndTime.innerHTML = showDate(date);

  let weatherIcon = document.querySelector("#current-weather-temp-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-weather-temp-icon" />`;

  getForecast();
}

function showDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  let currentTimeHours = date.getHours();
  let currentTimeMinutes = date.getMinutes();
  let fullCurrentTime = `${currentTimeHours}:${
    currentTimeMinutes < 10 ? "0" : ""
  }${currentTimeMinutes}`;

  return `${day} ${fullCurrentTime}`;
}

function getForecast(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");
  let city = searchInput.value;

  let apiKey = "6ot20ada7f719432a222baf96f0e9bb0";
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(forecastApiUrl).then(displayForecast);
}

function displayForecast(response) {
  let date = new Date(response.daily[0].time * 1000);
  let forecastday = document.querySelector("#day-0");
  forecastday.innerHTML = forecastDate(date);

  let forecastIcon = document.querySelector("#icon-0");
  forecastIcon.innerHTML = `<img src="${response.daily[0].condition.icon_url}" />`;

  let forecastTempValueMax = document.querySelector("#temp-0-max");
  forecastTempValueMax.innerHTML = Math.round(
    response.daily[0].temperature.maximum
  );

  let forecastTempValueMin = document.querySelector("#temp-0-min");
  forecastTempValueMin.innerHTML = Math.round(
    response.daily[0].temperature.minimum
  );
}

function forecastDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[date.getDay()];

  return day;
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", searchCity);
