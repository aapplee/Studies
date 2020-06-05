const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

    const{cityDets, weather} = data

    //update details template
    details.innerHTML = `
                    <div class="details">
                    <div class="city-weather">
                      <h3 class="city-name">${cityDets.EnglishName}</h3>
                      <div class="weather-temp">${weather.WeatherText}</div>
                        <span>${weather.Temperature.Metric.Value}</span>
                        <span>&deg;C</span>
                        </div>
                        </div>
                      </div>
    `;

    // update daytime photo
    let timeSrc = (weather.IsDayTime) ? 'img/day.svg': 'img/night.svg' ;
    time.setAttribute('src', timeSrc);

    // update icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)


    //remove display none
    if(card.classList.contains('d-none')) {card.classList.remove('d-none')};
}

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather}
}



cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get the city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // updateUI with new city
    updateCity(city).then(data => updateUI(data))
                    .catch(err => console.log(err));

    //set local storage for the city 
    localStorage.setItem('city', city);                   
})

if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
  .then(data => updateUI(data))
  .catch(err => console.log(err))
}