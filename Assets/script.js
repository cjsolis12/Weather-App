var userFormEl = document.querySelector('#user-form')
var citySearchEl = document.querySelector('#city-search')
var searchHistoryContainer = document.querySelector(search-history)
var apiKey = 'd9ec41326a5c9cfd94ea3263abf80c6c'

var formSubmitHandler = function (event){
    event.preventDefault();

    var city = citySearchEl.value.trim();
console.log(city)
    if(city){
    // function getCity(city);
        citySearchEl.value = ''
}
}

// var getCity = function (cityName){
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={'+apiKey+'}'

    fetch(apiUrl)
        .then(response =>{
           if(response.ok){
            response.json().then(function (data){
                displayWeather(data,user)
            })
           }else{
            alert('Error: ' + response.statusText)
           }
           })
       

//  };




// When user submits city 
userFormEl.addEventListener('submit', formSubmitHandler);