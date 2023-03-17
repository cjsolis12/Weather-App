var userFormEl = document.querySelector('#user-form')
var citySearchEl = document.querySelector('#city-search')
var searchHistoryList = document.querySelector('#search-history-list')
var mainWeatherTitle = document.querySelector('.main-weather-title')

var formSubmitHandler = function (event){
    event.preventDefault();

    var city = citySearchEl.value.trim();

    if(city){
        getCity(city);
        
        var searchedCity = document.createElement("li")
        searchedCity.innerText = city;
        searchHistoryList.append(searchedCity)
        citySearchEl.value = ''
    displayWeather()
    // fiveDayWeather()
}
}

const uvData = function(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d9ec41326a5c9cfd94ea3263abf80c6c`)
        .then(response =>{
        return response.json()
       }).then(data=>console.log(data))
    }

    // const fiveDayWeather = function(lat,lon){
    //     fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d9ec41326a5c9cfd94ea3263abf80c6c`)
    //         .then(response =>{
    //         return response.json()
    //        }).then(data=>console.log(data))
    //     }


var getCity = function (cityName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d9ec41326a5c9cfd94ea3263abf80c6c`)
        .then(res =>{
            return res.json()  
           }).then(data=>{
            console.log(data)
            uvData(data.coord.lat,data.coord.lon)
            displayWeather(data)
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



// When user submits city 
userFormEl.addEventListener('submit', formSubmitHandler);