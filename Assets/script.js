var userFormEl = document.querySelector('#user-form')
var citySearchEl = document.querySelector('#city-search')
var searchHistoryList = document.querySelector('#search-history-list')

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
    }



var getCity = function (cityName){
   var apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=d9ec41326a5c9cfd94ea3263abf80c6c`
    fetch(apiUrl)
        .then(response =>{
            return response.json()
           }).then(data=>{
            console.log(data)
            uvData(data.coord.lat,data.coord.lon)
           })
 };

// var displayWeather = function (city){

// }



// When user submits city 
userFormEl.addEventListener('submit', formSubmitHandler);