var userFormEl = document.querySelector('#user-form')
var citySearchEl = document.querySelector('#city-search')
var searchHistoryList = document.querySelector('#search-history-list')
var mainWeatherTitle = document.querySelector('.main-weather-title')

let metric = 'metric'



var formSubmitHandler = function (event){
    event.preventDefault();

    var city = citySearchEl.value.trim();

    if(city){
        getCity(city);
        
        var searchedCity = document.createElement("li")
        searchedCity.innerText = city;
        searchHistoryList.append(searchedCity)
        citySearchEl.value = ''
}
}

const uvData = function(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d9ec41326a5c9cfd94ea3263abf80c6c`)
        .then(response =>{
        return response.json()
       }).then(data=>console.log(data))
       .catch(console.err)
    }

var fiveDayWeather = function(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d9ec41326a5c9cfd94ea3263abf80c6c`)
            .then(res =>{
            return res.json()
           }).then(data=>{
            console.log(data)
            showFiveDays(data)
           })
        }


var getCity = function (cityName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d9ec41326a5c9cfd94ea3263abf80c6c`)
        .then(res =>{
            return res.json()  
           }).then(data=>{
            console.log(data)
            uvData(data.coord.lat,data.coord.lon)
            displayWeather(data)
            fiveDayWeather(data.coord.lat,data.coord.lon)
            // showFiveDays(data)
           })
 };

var displayWeather = function (data){
    if(data) {
        var tempK = data.main.temp;
        var tempF = Math.floor((tempK - 273.15) * 1.8 + 32);
        console.log(tempK)
        console.log(tempF)
    document.querySelector('.current-weather-title').innerHTML = `${data.name}`
    var weatherIcon = document.createElement('img')
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    mainWeatherTitle.append(weatherIcon)
    document.querySelector('.temp').innerHTML = `Temp: ${tempF} &#x2109;`
    document.querySelector('.wind').innerHTML = `Wind: ${data.wind.speed}`
    document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`
    }

}

var showFiveDays = (data) =>{
    var cardsHtml = data.list.map(function(day){
        var date = new Date(day.dt * 1000)
        var weatherIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        var tempK = day.main.temp
        var tempF = Math.floor((tempK - 273.15) * 1.8 + 32)
        var html = `<div class=col card shadow p-2 m-3 bg-body-tertiary rounded">
        <h5 class="card-title ">${date.toLocaleDateString()}</h5>
        <img src="${weatherIcon}" alt="Weather icon" class="card-img">
        <div class="card-body">
            <p class="card-text">Temp:${tempF} &#x2109</p>
            <p class="card-text">Wind:${day.wind.speed}</p>
            <p class="card-text">Humidity:${day.main.humidity}%</p>
        </div>
        </div>`
  return html
    });

    let row = document.querySelector('.weather.row')
    row.innerHTML = cardsHtml.join('')
    
}

// When user submits city 
userFormEl.addEventListener('submit', formSubmitHandler);