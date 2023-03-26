var URL = "https://api.openweathermap.org/data/2.5/weather?q="
var key = "1571522051a8ada1791d1447e733a8b1"
var form = document.querySelector('form')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    var cityLoc = document.getElementById('weather-search').value;
    fetch(URL + cityLoc + "&appid=" + key)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var cityName = data.name + ",";
            var countryCode = data.sys.country;
            var gMapsLink = "https://www.google.com/maps/search/?api=1&query=" + data.coord.lat + "," + data.coord.lon;
            var weatherIconUrl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            var weatherDesc = data.weather[0].description;
            var actualTemp = Math.round(((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2));
            var feelsLike = Math.round(((data.main.feels_like - 273.15) * 9 / 5 + 32).toFixed(2));
            var timeLastUpdated = data.dt;

            displayWeatherData(cityName, countryCode, gMapsLink, weatherIconUrl, weatherDesc, actualTemp, feelsLike, timeLastUpdated);
            form.reset();
        })
        .catch(function (err) {
            return (err)
        })
})

function displayWeatherData(cityName, countryCode, gMapsLink, weatherIconUrl, weatherDesc, actualTemp, feelsLike, timeLastUpdated) {
    var weatherSection = document.getElementById('weather')

    weatherSection.innerHTML = "";

    // City & Country Display
    var ccDisplay = document.createElement('h2');
    ccDisplay.textContent = cityName + " " + countryCode;
    weatherSection.appendChild(ccDisplay);

    // Click to view map display
    var mapLink = document.createElement('a');
    mapLink.setAttribute('href', gMapsLink);
    mapLink.setAttribute('target', '_blank');
    mapLink.textContent = 'click to view map!';
    var mapLinkContainer = document.createElement('p');
    mapLinkContainer.appendChild(mapLink);
    weatherSection.appendChild(mapLinkContainer);

    // Weather icon display
    var weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', weatherIconUrl);
    weatherSection.appendChild(weatherIcon);

    // Weather description display
    var weatherDescDisplay = document.createElement('p');
    weatherDescDisplay.textContent = weatherDesc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    weatherSection.appendChild(weatherDescDisplay);


    // Actual temp display
    var actualTempDisplay = document.createElement('p');
    actualTempDisplay.textContent = 'Temperature: ' + actualTemp + ' F';
    weatherSection.appendChild(actualTempDisplay);

    // Feels like display
    var feelsLikeDisplay = document.createElement('p');
    feelsLikeDisplay.textContent = 'Feels like: ' + feelsLike + ' F';
    weatherSection.appendChild(feelsLikeDisplay);

    // Last update display
    var timeLastUpdatedDisplay = document.createElement('p');
    timeLastUpdatedDisplay.textContent = 'Last updated: ' + new Date(timeLastUpdated * 1000).toLocaleTimeString();
    weatherSection.appendChild(timeLastUpdatedDisplay);
}

