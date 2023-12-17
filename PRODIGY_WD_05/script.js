let weatherInfo = document.querySelector('.weather-info');
let form = document.querySelector('form');
let input = document.querySelector('.input');
let temperature = document.querySelector('.temperature');
let weatherLocation = document.querySelector('.location');
let humidity = document.querySelector('.humidity-info');
let wind = document.querySelector('.wind-info');
let weatherImg = document.querySelector('.weather-img');

let city = 'mumbai';
input.value = city;
weatherData(city);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    city = input.value;
    weatherData(city);
});


async function weatherData(city) {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=5717014c0ee540a88f653158231607&q=${city}&aqi=yes`);

    const data = await res.json();

    weatherInfo.classList.add('show');
    temperature.textContent = data.current.temp_c;
    weatherLocation.textContent = data.location.name;
    humidity.textContent = data.current.humidity;
    wind.textContent = data.current.wind_kph;
    weatherImg.setAttribute('src', data.current.condition.icon);
}