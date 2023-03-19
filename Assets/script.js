var userFormEl = document.querySelector("#user-form");
var citySearchEl = document.querySelector("#city-search");
var searchHistoryList = document.querySelector("#search-history-list");
var mainWeatherTitle = document.querySelector(".main-weather-title");

let metric = "metric";

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = citySearchEl.value.trim();

  if (city) {
    getCity(city);

    var searchedCity = document.createElement("li");
    searchedCity.innerText = city;
    searchHistoryList.append(searchedCity);
    citySearchEl.value = "";
  }
};

var fiveDayWeather = function (lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d9ec41326a5c9cfd94ea3263abf80c6c`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      showFiveDays(data);
    });
};

var getCity = function (cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d9ec41326a5c9cfd94ea3263abf80c6c`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displayWeather(data);
      fiveDayWeather(data.coord.lat, data.coord.lon);
    });
};

var displayWeather = function (data) {
  if (data) {
    var tempK = data.main.temp;
    var tempF = Math.floor((tempK - 273.15) * 1.8 + 32);
    console.log(tempK);
    console.log(tempF);
    document.querySelector(".current-weather-title").innerHTML = `${data.name}`;
    var weatherIcon = document.createElement("img");
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    mainWeatherTitle.append(weatherIcon);
    document.querySelector(".temp").innerHTML = `Temp: ${tempF} &#x2109;`;
    document.querySelector(".wind").innerHTML = `Wind: ${data.wind.speed}`;
    document.querySelector(
      ".humidity"
    ).innerHTML = `Humidity: ${data.main.humidity}%`;
  }
};

var showFiveDays = function (data) {
  var forecastDays = [];
  var date = new Date(data.list[0].dt * 1000);

  for (let i = 0; i < 5; i++) {
    var forecast = data.list.find((f) => {
      var fDate = new Date(f.dt * 1000);
      return fDate.getDate() === date.getDate();
    });

    if (forecast) {
      var temperature = Math.round((forecast.main.temp - 273.15) * 1.8 + 32);
      var humid = forecast.main.humidity;
      var wind = forecast.wind.speed
      var icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

      forecastDays.push(
        `<div class="col-md">
                <div class="card">
                <div class="card-body">
                <h5 class="card-title">${date.toLocaleDateString()}</h5>
                <img src="${icon}" alt="weather icon">
                <p class="card-text">Temp: ${temperature}°F</p>
                <p class="card-text">Wind: ${wind}%</p>
                <p class="card-text">Humidity: ${humid}%</p>
            </div>
          </div>
        </div>
      `);
    }
    date.setDate(date.getDate()+1);
  }
  let row = document.querySelector('.weather.row')
    row.innerHTML = forecastDays.join('')
};

// When user submits city
userFormEl.addEventListener("submit", formSubmitHandler);
