var userFormEl = document.querySelector("#user-form");
var citySearchEl = document.querySelector("#city-search");
var searchHistoryList = document.querySelector("#search-history-list");
var mainWeatherTitle = document.querySelector(".main-weather-title");
var clearBtn = document.querySelector("#clear-btn");
var allSearchedCities = []


// Function when search is clicked 
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = citySearchEl.value.trim()
 
  if (city && !allSearchedCities.includes(city)) {
    getCity(city);
    var searchedCity = document.createElement("button");
    searchedCity.setAttribute("class", "cities")
    searchedCity.innerText = city;
    searchHistoryList.append(searchedCity);
    citySearchEl.value = "";
    allSearchedCities.push(city)
    localStorage.setItem('searchHistory', JSON.stringify(allSearchedCities))
  } 
};

// New button for each city searched on aside bar
var searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
if(searchHistory){
  allSearchedCities = searchHistory;
  searchHistory.forEach(function(city){
    var searchedCity = document.createElement("button");
    searchedCity.setAttribute("class", "cities")
    searchedCity.innerText = city;
    searchHistoryList.append(searchedCity)
});
}

// When button is clicked, city weather is displayed 
searchHistoryList.addEventListener("click", function(event) {
  if (event.target.matches("button")) {
    var city = event.target.innerText;
    getCity(city);
  }
});

// Search History Clear button
clearBtn.addEventListener('click', () => {
  searchHistoryList.innerHTML = "";
  localStorage.removeItem('searchHistory');
})

// API call for 5 day array 
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

// API call to current city
var getCity = function (cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d9ec41326a5c9cfd94ea3263abf80c6c`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displayCurrentWeather(data);
      fiveDayWeather(data.coord.lat, data.coord.lon);
      showFiveDays(data);
    })
    .catch(error => console.log(error));
};

var displayCurrentWeather = function (data) {
  if (data) {
    // var date = new Date(data.list[0].dt * 1000);
        var city = data.name
        var temperature = Math.round((data.main.temp - 273.15) * 1.8 + 32);
        var humid = data.main.humidity;
        var wind = data.wind.speed
        var icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        var date = new Date().toLocaleDateString()
        var html = `<div class="col-md">
                        <h2 class="card-title text-primary">${city}</h2>
                        <p>${date}</p>
                        <img src="${icon}" alt="weather icon">
                        <p class="card-text">Temp: ${temperature}°F</p>
                        <p class="card-text">Wind: ${wind}%</p>
                        <p class="card-text">Humidity: ${humid}%</p>
                     </div>`}
        let row = document.querySelector('.current-weather-box')
        row.innerHTML = html;
};

var showFiveDays = function (data) {
  var forecastDays = [];
  var today = new Date();
  var tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  // var date = new Date(data.list[2].dt * 1000);

  for (let i = 0; i < 5; i++) {
    var forecast = data.list.find((f) => {
      var fDate = new Date(f.dt * 1000);
      return fDate.getDate() === tomorrow.getDate();
    });

    if (forecast) {
      var temperature = Math.round((forecast.main.temp - 273.15) * 1.8 + 32);
      var humid = forecast.main.humidity;
      var wind = forecast.wind.speed
      var icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

      forecastDays.push(
        `<div class="col-md ">
                <div class="card">
                <div class="card-body">
                <h5 class="card-title text-primary">${tomorrow.toLocaleDateString()}</h5>
                <img src="${icon}" alt="weather icon">
                <p class="card-text">Temp: ${temperature}°F</p>
                <p class="card-text">Wind: ${wind}%</p>
                <p class="card-text">Humidity: ${humid}%</p>
            </div>
          </div>
        </div>
      `);
    }
    tomorrow.setDate(tomorrow.getDate()+1);
  }
  let row = document.querySelector('.weather.row')
    row.innerHTML = forecastDays.join('')
};

// When user submits city
userFormEl.addEventListener("submit", formSubmitHandler);
