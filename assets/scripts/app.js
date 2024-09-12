const apikey = '9ae6f9103dcb632a19b957682424699a';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search-btn ');
const weatherIcon = document.querySelector('.weather-icon ');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);

  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    var data = await response.json();

    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '°c';
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML =
      Math.round(data.wind.speed) + ' km/h';

    if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = 'https://i.postimg.cc/pTZmf4XH/clouds.png';
    } else if (data.weather[0].main == 'Clear') {
      weatherIcon.src = 'https://i.postimg.cc/BQcJXH6r/clear.png';
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = 'https://i.postimg.cc/QCZrMdrN/rain.png';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = 'https://i.postimg.cc/zGz8WvHV/drizzle.png';
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.src = 'https://i.postimg.cc/fR8ZvsY5/mist.png';
    } else if (data.weather[0].main == 'Snow') {
      weatherIcon.src = 'https://i.postimg.cc/6qVx4x9r/snow.png';
    }
    document.querySelector('.error').style.display = 'none';
    document.querySelector('.weather').style.display = 'block';
  }

  console.log(data);
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
document.onkeydown = function (evt) {
  var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
  if (keyCode == 13) {
    checkWeather(searchBox.value);
  }
};
