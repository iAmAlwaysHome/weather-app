function showSearchedFahrenheit(response) {
  let temperatureSearched = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector(`#temperature-grade`);
  tempNumber.innerHTML = `${temperatureSearched}&degF`;
}

function showSearchedCelcius(response) {
  let temperatureSearched = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector(`#temperature-grade`);
  tempNumber.innerHTML = `${temperatureSearched}&degC`;
}

// Axios information + Calling temperature for fahrenheit
function searchFahrenheit(event) {
  event.preventDefault();
  let citySearched = document.querySelector(`#show-city`).textContent;

  // axios API (for fahrenheit)
  let apiKey= '57821c3b75b60c68ecd1a8d0dd1aa8d3';
  let mainLink = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `imperial`;

  let apiUrl = `${mainLink}q=${citySearched}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showSearchedFahrenheit);
}

// Axios information + Calling temperature for Celcius
function searchCelcius(event) {
  event.preventDefault();
  let citySearched = document.querySelector(`#show-city`).textContent;

  // axios API (for fahrenheit)
  let apiKey= '57821c3b75b60c68ecd1a8d0dd1aa8d3';
  let mainLink = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;

  let apiUrl = `${mainLink}q=${citySearched}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showSearchedCelcius);
}

function formatDate(date) {
  let days = [ `SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;  
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  document.querySelector(`#date`).innerHTML = `${day} ${hours}:${minutes}`;
}

function getForecastDay(timestamp) {
  let weekDay = [`MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`, `SUN`];
  return weekDay[(new Date(timestamp * 1000)).getDay()];
}

//8 days forecast
function generateForecast(response) {
  let forecastRow = `<div class="row text-center g-2">`;
  //Add each day to forecastRow
  response.data.daily.forEach(function (forecastDay, index) {
    if (index < 6) {     
      let addingElement = `fa-cloud`; 
      if (forecastDay.weather[0].main === `Rain`)
        addingElement = `fa-cloud-showers-heavy`;
      else if (forecastDay.weather[0].main === `Clouds`) 
        addingElement = `fa-cloud`;
      else if (forecastDay.weather[0].main === `Drizzle`) 
      addingElement = `fa-cloud-rain`;
      else if (forecastDay.weather[0].main === `Clear`)
      addingElement = `fa-sun`;
      else if (forecastDay.weather[0].main === `Fog` ) 
        addingElement = `fa-smog`;
      else if (forecastDay.weather[0].main === `Smoke`)
      addingElement = `fa-smog`;
      else if (forecastDay.weather[0].main === `Mist`) 
      addingElement = `fa-smog`;
      else if (forecastDay.weather[0].main === `Snow`)
      addingElement = `fa-snowflake`;
      else if (forecastDay.weather[0].main === `Haze`)
      addingElement = `fa-smog`;
      else if (forecastDay.weather[0].main === `Thunderstorm`) 
        addingElement = `fa-bolt`;
      forecastRow += `<div class="col-4" > <div class="p-3 text-center next-days-edit color-forecast-cell">
        <h5 class="card-title" id="one" style="min-width:120px; min-height:60px;">${getForecastDay(forecastDay.dt)}</h5> <i class="fas ${addingElement} icon icon-days" id="iconNext"></i>
        <p class="card-text" id="max"><strong>${Math.round(forecastDay.temp.max)}</strong>&deg ${Math.round(forecastDay.temp.min)}&deg</p></div></div>`;
    }});
  document.querySelector(`#forecastCell`).innerHTML = forecastRow + `</div>`;
}

//is called when #user-input #search-input and #actual-location are clicked
function showSearchedCity(apiResponse) {
  
  if (apiResponse !== undefined && apiResponse.data !== undefined && apiResponse.data.main !== undefined ) {
  
  document.querySelector(`#show-city`).innerHTML = document.querySelector(`#enter-city`).value;
  document.querySelector(`#show-city`).innerHTML = apiResponse.data.name;  
  document.querySelector(`#temperature-grade`).innerHTML = `${Math.round(apiResponse.data.main.temp)}&degC`;
  document.querySelector(`#description-weather`).innerHTML = apiResponse.data.weather[0].main;
  document.querySelector(`#humidity`).innerHTML = `${apiResponse.data.main.humidity}%`;
  document.querySelector(`#wind`).innerHTML = `${Math.round((apiResponse.data.wind.speed * 18) / 5)} km/h`;

  //forecast data
 let apiKey= '57821c3b75b60c68ecd1a8d0dd1aa8d3';
 axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${apiResponse.data.coord.lat}&lon=${apiResponse.data.coord.lon}&units=metric&appid=${apiKey}`).then(generateForecast);

  if (document.querySelector(`#description-weather`).textContent === `Clear`) 
    document.querySelector(`#icon-weather`).setAttribute(`class`, `fas fa-sun icon-weather`);
  else if (document.querySelector(`#description-weather`).textContent === `Rain`) 
    document.querySelector(`#icon-weather`).setAttribute(`class`,`fas fa-cloud-showers-heavy icon-weather`);
  else if (document.querySelector(`#description-weather`).textContent === `Clouds`)  
    document.querySelector(`#icon-weather`).setAttribute(`class`, `fas fa-cloud icon-weather`);
  else if (document.querySelector(`#description-weather`).textContent === `Thunderstorm`) 
   document.querySelector(`#icon-weather`).setAttribute(`class`, `fas fa-bolt icon-weather`);
  else if (document.querySelector(`#description-weather`).textContent === `Haze`) 
   document.querySelector(`#icon-weather`).setAttribute(`class`, `fas fa-smog icon-weather`);
  else if (document.querySelector(`#description-weather`).textContent === `Mist`) 
    document.querySelector(`#icon-weather`).setAttribute(`class`, `fas fa-smog icon-weather`);
  else if (document.querySelector(`#description-weather`).textContent === `Drizzle`) 
    document.querySelector(`#icon-weather`).setAttribute(`class`, `fas fa-cloud-rain icon-weather`);
  else if (document.querySelector(`#description-weather`).textContent === `Smoke`)
    document.querySelector(`#icon-weather`).setAttribute(`class`, `fas fa-smog icon-weather`);
  else if (document.querySelector(`#description-weather`).textContent === `Snow`) 
    document.querySelector(`#icon-weather`).setAttribute(`class`, `fas fa-snowflake icon-weather`);
  else if (document.querySelector(`#description-weather`).textContent === `Fog`) 
    document.querySelector(`#icon-weather`).setAttribute(`class`, `fas fa-smog icon-weather`);
  }
}

//is called when #user-input #search-input are clicked
function searchCity(city) {  
  let apiKey = "57821c3b75b60c68ecd1a8d0dd1aa8d3";
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, { validateStatus: false }).then(showSearchedCity);
}

function display_city(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

//is called when #actual-location is clicked
function showPosition(position) {
  let apiKey = `57821c3b75b60c68ecd1a8d0dd1aa8d3`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiURL}`).then(showSearchedCity);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}


setInterval(formatDate(new Date()), 1000);
//searchCity("Ankara");

document.querySelector(`#user-input`).addEventListener(`submit`, display_city);
document.querySelector(`#search-input`).addEventListener(`click`, display_city);
document.querySelector(`#actual-location`).addEventListener(`click`, getCurrentLocation);

document.querySelector(`#fahrenheit`).addEventListener(`click`, searchFahrenheit);
document.querySelector(`#celcius`).addEventListener(`click`, searchCelcius);