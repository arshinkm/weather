const apiKey = "eeaaba0926c897bd7c6ded7d9d8821e7";

const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('searchbtn');
const celsiusBtn = document.getElementById('celsiusbtn');
const fahrenheitBtn = document.getElementById('fahrenheitbtn');
const cityName = document.getElementById('cityname');
const weatherDescription = document.getElementById('weatherdescription');
const temperature = document.getElementById('temperature');
const forecast = document.getElementById('forecast');
const weather = document.getElementById('weather');
const weathericons = document.getElementById('weathericons');

let unit = 'metric';

searchBtn.addEventListener('click',() => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    }
});

celsiusBtn.addEventListener('click',() => {
    unit = 'metric';
    toggleActiveUnit();
    fetchWeatherData(cityName.textContent);
});

fahrenheitBtn.addEventListener('click',() => {
    unit = 'imperial';
    toggleActiveUnit();
    fetchWeatherData(cityName.textContent);
});

function toggleActiveUnit() {
    if (unit === 'metric') {
        celsiusBtn.classList.add('active');
        fahrenheitBtn.classList.remove('active');
    } else {
        celsiusBtn.classList.remove('active');
        fahrenheitBtn.classList.add('active');
    }
}

function fetchWeatherData(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => updateWeatherDisplay(data))
        .catch(error => console.error(error));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => updateForecastDisplay(data))
        .catch(error => console.error(error));
}


function updateWeatherDisplay(data) {
    cityName.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp)}°`;

    weather.className = '';
    const weatherCondition = data.weather[0].main.toLowerCase();
    switch (weatherCondition) {
        case 'clear':
            weathericons.src = './clear.png';
            weather.className = 'clear' ;
            break;
        case 'clouds':
            weathericons.src = './clouds.png';
            weather.className = 'clouds' ;
            break;
        case 'rain':
            weathericons.src = './rain.png';
            weather.className = 'rain' ;
            break;
        case 'snow':
            weathericons.src = './snow.png';
            weather.className = 'snow' ;
            break;
        case 'thunderstorm':
            weathericons.src = './clear.jpg';
            weather.className = 'thunderstorm' ;
            break;
        case 'drizzle':
            weathericons.src = './thunderstorm.png';
            weather.className = 'drizzle' ;
            break;
        case 'mist':
            weathericons.src = './mist.png';
            weather.className = 'mist' ;
            break;
        default:
            weathericons.src = '';
            weather.className = '';
            break;
    }
}

function updateForecastDisplay(data) {
    forecast.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const item = data.list[i * 8];
        const date = new Date(item.dt_txt).toLocaleDateString();
        const temp = Math.round(item.main.temp);
        const description = item.weather[0].description;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <p>${date}</p>
            <p>${temp}°</p>
            <p>${description}</p>
        `;

        forecast.appendChild(forecastItem);

    }
}


