const apiKey = '2b93d4ad45f799754a72c1c26e7c44ef';
const searchButton = document.querySelector('.search');
const outputElement = document.getElementById('weather-output');
const minContainer = document.querySelector('.miniconatiner');
const inputElement = document.querySelector('.In');
let logo = document.querySelector('.logo');
let body = document.querySelector('body');
let mini1 = document.querySelector('.mini1');
let mini2 = document.querySelector('.mini2');
let humid = document.querySelector('.humid');
let windspeedElement = document.querySelector('.windspeed');

searchButton.addEventListener('click', () => {
  const location = inputElement.value.trim();
  if (!location) {
    outputElement.innerText = 'Please enter a location.';
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const description = data.weather[0].description.toLowerCase();
      const locationName = data.name;
      const windspeed = data.wind.speed;

      console.log(` ${temperature}°C`);
      console.log(`Weather: ${description}`);
      console.log(`Location: ${locationName}`);
      console.log(`Humidity: ${humidity}`);
      console.log(`Wind Speed: ${windspeed}`);

      if (description === 'haze') {
        logo.style.backgroundImage = "url('./images/wind.gif')";
      } else if (description === 'broken clouds'|| description==='overcast clouds'|| description==='scattered clouds') {
        logo.style.backgroundImage = "url('./images/cloudy.gif')";
      }
      else if (description === 'clear sky') {
        logo.style.backgroundImage = "url('./images/sun.gif')";
      }
      else if (description === 'Mist') {
        logo.style.backgroundImage = "url('./images/fog.mp4')";
      }
       else {
        logo.style.backgroundImage = ''; // Clear the background image if not haze or broken clouds
      }

      mini1.innerText = ` ${temperature}°C`;
      mini2.innerText = `${locationName}`;
      humid.style.backgroundImage = "url('./images/weather.png')";
      humid.innerText = ` ${humidity}%\n Humidity`;
      windspeedElement.innerText = ` ${windspeed} m/s\n Windspeed`;
    })
    .catch(error => {
      console.error('Error:', error);
      outputElement.innerText = 'Error fetching weather data.';
    });
});
