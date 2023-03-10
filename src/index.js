function displayTempF(response) {
  document.querySelector(`#today-temp`).innerHTML = `${Math.round(response.data.main.temp)}&degF`;
  document.querySelector(`#today-temp2`).innerHTML = `${Math.round(response.data.main.temp)}&degF`;
}

function displayTempC(response) {
  document.querySelector(`#today-temp`).innerHTML = `${Math.round(response.data.main.temp)}&degC`;
  document.querySelector(`#today-temp2`).innerHTML = `${Math.round(response.data.main.temp)}&degC`;
}

function getTempF(event) {
  event.preventDefault();
  let apiKey= 'c119ffef35b7245a5e03b6e5724ae961';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${document.querySelector(`#displayed-city-name`).textContent}&units=imperial&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayTempF);
}

function getTempC(event) {
  event.preventDefault();
  let apiKey= 'c119ffef35b7245a5e03b6e5724ae961';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${document.querySelector(`#displayed-city-name`).textContent}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayTempC);
}

function displayDate() {
  const date = new Date();
  let days = [ `SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;  
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  document.querySelector(`#date`).innerHTML = `${day} ${hours}:${minutes}`;
  document.querySelector(`#date2`).innerHTML = `${day} ${hours}:${minutes}`;
  setTimeout(displayDate, 1000);
}

function getForecastDay(timestamp) {
  let weekDay = [`MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`, `SUN`];
  return weekDay[(new Date(timestamp * 1000)).getDay()];
}

//6 days forecast
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
      forecastRow += `<div class="col-4" > <div class="p-3 text-center forecast-cell">
      <h5 class="cell-day">${getForecastDay(forecastDay.dt)}</h5> <i class="fas ${addingElement} icon " id="forecastIcon"></i>
      <p id="max"><strong>${Math.round(forecastDay.temp.max)}</strong>&deg ${Math.round(forecastDay.temp.min)}&deg</p></div></div>`;
    }});
  document.querySelector(`#forecastCells`).innerHTML = forecastRow + `</div>`;
  document.querySelector(`#forecastCells2`).innerHTML = forecastRow + `</div>`;
}

//is called when #user-input #search-input and #user-location are clicked
function showSearchedCity(apiResponse) {
  
  if (apiResponse !== undefined && apiResponse.data !== undefined && apiResponse.data.main !== undefined ) {
  
  document.querySelector(`#displayed-city-name`).innerHTML = apiResponse.data.name;  
  document.querySelector(`#today-temp`).innerHTML = `${Math.round(apiResponse.data.main.temp)}&degC`;
  document.querySelector(`#description-text`).innerHTML = apiResponse.data.weather[0].main;
  document.querySelector(`#humidity`).innerHTML = `${apiResponse.data.main.humidity}%`;
  document.querySelector(`#wind`).innerHTML = `${Math.round((apiResponse.data.wind.speed * 18) / 5)} km/h`;
  document.querySelector(`#displayed-city-name2`).innerHTML = apiResponse.data.name;  
  document.querySelector(`#today-temp2`).innerHTML = `${Math.round(apiResponse.data.main.temp)}&degC`;
  document.querySelector(`#description-text2`).innerHTML = apiResponse.data.weather[0].main;
  document.querySelector(`#humidity2`).innerHTML = `${apiResponse.data.main.humidity}%`;
  document.querySelector(`#wind2`).innerHTML = `${Math.round((apiResponse.data.wind.speed * 18) / 5)} km/h`;

  //forecast data
 let apiKey= 'c119ffef35b7245a5e03b6e5724ae961';
 axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${apiResponse.data.coord.lat}&lon=${apiResponse.data.coord.lon}&units=metric&appid=${apiKey}`).then(generateForecast);

 //img
  if (document.querySelector(`#description-text`).textContent === `Clear`) 
    document.querySelector(`#weather-icon`).setAttribute(`class`, `fas fa-sun weather-icon`);
  else if (document.querySelector(`#description-text`).textContent === `Rain`) 
    document.querySelector(`#weather-icon`).setAttribute(`class`,`fas fa-cloud-showers-heavy weather-icon`);
  else if (document.querySelector(`#description-text`).textContent === `Clouds`)  
    document.querySelector(`#weather-icon`).setAttribute(`class`, `fas fa-cloud weather-icon`);
  else if (document.querySelector(`#description-text`).textContent === `Thunderstorm`) 
   document.querySelector(`#weather-icon`).setAttribute(`class`, `fas fa-bolt weather-icon`);
  else if (document.querySelector(`#description-text`).textContent === `Haze`) 
   document.querySelector(`#weather-icon`).setAttribute(`class`, `fas fa-smog weather-icon`);
  else if (document.querySelector(`#description-text`).textContent === `Mist`) 
    document.querySelector(`#weather-icon`).setAttribute(`class`, `fas fa-smog weather-icon`);
  else if (document.querySelector(`#description-text`).textContent === `Drizzle`) 
    document.querySelector(`#weather-icon`).setAttribute(`class`, `fas fa-cloud-rain weather-icon`);
  else if (document.querySelector(`#description-text`).textContent === `Smoke`)
    document.querySelector(`#weather-icon`).setAttribute(`class`, `fas fa-smog weather-icon`);
  else if (document.querySelector(`#description-text`).textContent === `Snow`) 
    document.querySelector(`#weather-icon`).setAttribute(`class`, `fas fa-snowflake weather-icon`);
  else if (document.querySelector(`#description-text`).textContent === `Fog`) 
    document.querySelector(`#weather-icon`).setAttribute(`class`, `fas fa-smog weather-icon`);
    
    if (document.querySelector(`#description-text2`).textContent === `Clear`) 
    document.querySelector(`#weather-icon2`).setAttribute(`class`, `fas fa-sun weather-icon`);
  else if (document.querySelector(`#description-text2`).textContent === `Rain`) 
    document.querySelector(`#weather-icon2`).setAttribute(`class`,`fas fa-cloud-showers-heavy weather-icon`);
  else if (document.querySelector(`#description-text2`).textContent === `Clouds`)  
    document.querySelector(`#weather-icon2`).setAttribute(`class`, `fas fa-cloud weather-icon`);
  else if (document.querySelector(`#description-text2`).textContent === `Thunderstorm`) 
   document.querySelector(`#weather-icon2`).setAttribute(`class`, `fas fa-bolt weather-icon`);
  else if (document.querySelector(`#description-text2`).textContent === `Haze`) 
   document.querySelector(`#weather-icon2`).setAttribute(`class`, `fas fa-smog weather-icon`);
  else if (document.querySelector(`#description-text2`).textContent === `Mist`) 
    document.querySelector(`#weather-icon2`).setAttribute(`class`, `fas fa-smog weather-icon`);
  else if (document.querySelector(`#description-text2`).textContent === `Drizzle`) 
    document.querySelector(`#weather-icon2`).setAttribute(`class`, `fas fa-cloud-rain weather-icon`);
  else if (document.querySelector(`#description-text2`).textContent === `Smoke`)
    document.querySelector(`#weather-icon2`).setAttribute(`class`, `fas fa-smog weather-icon`);
  else if (document.querySelector(`#description-text2`).textContent === `Snow`) 
    document.querySelector(`#weather-icon2`).setAttribute(`class`, `fas fa-snowflake weather-icon`);
  else if (document.querySelector(`#description-text2`).textContent === `Fog`) 
    document.querySelector(`#weather-icon2`).setAttribute(`class`, `fas fa-smog weather-icon`);
  }
}

//is called when #user-input #search-input are clicked
function searchCity(city) {  
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, { validateStatus: false }).then(showSearchedCity);
}

function display_city(event) {
  event.preventDefault();
  searchCity(document.querySelector("#enter-city").value);
  searchCity(document.querySelector("#enter-city2").value);
}

//is called when #user-location is clicked
function showPosition(position) {
  let apiKey = `c119ffef35b7245a5e03b6e5724ae961`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiURL}`).then(showSearchedCity);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

document.querySelector(`#user-input`).addEventListener(`submit`, display_city);
document.querySelector(`#user-input2`).addEventListener(`submit`, display_city);
document.querySelector(`#search-input`).addEventListener(`click`, display_city);
document.querySelector(`#search-input2`).addEventListener(`click`, display_city);
document.querySelector(`#user-location`).addEventListener(`click`, getCurrentLocation);
document.querySelector(`#user-location2`).addEventListener(`click`, getCurrentLocation);
document.querySelector(`#fahrenheit`).addEventListener(`click`, getTempF);
document.querySelector(`#fahrenheit2`).addEventListener(`click`, getTempF);
document.querySelector(`#celcius`).addEventListener(`click`, getTempC); 
document.querySelector(`#celcius2`).addEventListener(`click`, getTempC); 

var myVar;

function load() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  displayDate();
  searchCity("Moscow");  
  document.getElementById("regular-website").style.display = "block";
  document.getElementById("regular-website2").style.display = "block";
  document.body.classList.add('loaded');
}
