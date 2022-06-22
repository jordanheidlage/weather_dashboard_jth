//step 1 :define all your html static selectors
var cityEl = document.querySelector("#city")
var cityFormEl = document.querySelector("#city-form")
var currentWeatherContainer = document.querySelector('#currentWeather')
var forecastContainer = document.querySelector('#forecast')
var api = "43307f36c133c1b4d80feb3644b2ab3e"

var cityNamesEl = document.querySelector("#citynames")
//step2: make an addEventListener on Submit and create displayDashboard - it shows current weather and last five day

function userInput(event) {
    event.preventDefault()
    var cityName = cityEl.value
    displayWeather(cityName)
}

function displayWeather(cityName) {
    var urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=imperial`

    fetch(urlCurrent)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {

            console.log(currentData)
            var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${api}&units=imperial
            `
            fetch(fiveDayUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (weatherData) {
                    console.log(weatherData)

                    currentWeather(weatherData.current, currentData.name)

                    fiveDayforecast(weatherData.daily)


                })
        })


}

function currentWeather(current, city) {
    console.log(current)
    currentWeatherContainer.innerHTML = '';

    var container = document.createElement('div')
    var heading = document.createElement('h4')
    var tempEl = document.createElement('p')
    var windEl = document.createElement('p')
    var humidityEl = document.createElement('p')
    var uviEL = document.createElement('p')

    container.setAttribute('class', 'container-fluid')
    heading.setAttribute('class', 'display-5 fw-bold')
    uviEL.setAttribute('Class', 'btn btn-success')

    var currentDate = moment.unix(current.dt).format("MM/DD/YYYY")
    var iconImage = document.createElement("img")
    iconImage.setAttribute("src", `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`)
    heading.textContent = city + " " + currentDate
    heading.append(iconImage)


    tempEl.textContent = 'Temp: ' + current.temp
    windEl.textContent = 'Wind: ' + current.wind_speed
    humidityEl.textContent = 'Humidity: ' + current.humidity
    uviEL.textContent = 'UVI: ' + current.uvi


    container.append(heading, tempEl, windEl, humidityEl, uviEL)
    currentWeatherContainer.append(container);
}
function fiveDayforecast(daily, forecast) {
    console.log(forecast)
    forecastContainer.innerHTML = '';

    for (var i = 1; i < 6; i++) {
        console.log(i)

        var forecastCol = document.createElement('div')
        var forecastCard = document.createElement('div')
        var forecastBody = document.createElement('div')
        var heading = document.createElement('h4')
        var tempEl = document.createElement('p')
        var windEl = document.createElement('p')
        var humidityEl = document.createElement('p')

        //   add class attributes here for all styling
        forecastCol.setAttribute('class', 'col-sm-2')
        // forecastBody = setAttribute('class', 'card-body')
        heading.setAttribute('class', 'display-5 fw-bold')

        //   add all the text content for the elements

        var dailyDate = moment.unix(daily.dt).format("MM/DD/YYYY")
        var iconImage = document.createElement("img")
        iconImage.setAttribute("src", `http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`)
        heading.textContent = city + " " + dailyDate
        heading.append(iconImage)

        tempEl.textContent = "Wind: " + daily.temp
        windEl.textContent = "Wind: " + daily.wind_speed
        humidityEl.textContent = "Wind: " + daily.humidity


        // append the elements in the correct order. works in reverse

        container.append(heading,tempEl, windEl, humidityEl)
        forecastContainer.append(container);
    }
}


cityFormEl.addEventListener("submit", userInput)






