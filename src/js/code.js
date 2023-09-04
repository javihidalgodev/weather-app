const APIkey = '527a0f0cbb5bf1b9f51a2b51cb4cbe80'

const notFound = document.querySelector('.not-found')
const error = document.querySelector('.error')

const searchInput = document.querySelector('input[type=text]')
const searchBtn = document.querySelector('.search-btn')

const weatherContainer = document.querySelector('.weather-container')
const city = document.querySelector('.city')
const imgDescription = document.querySelector('.img-description')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const hPercent = document.querySelector('.percent')
const kmh = document.querySelector('.kmh')

const moreDetailsBtn = document.querySelector('.more-details-btn')
const moreDetailsContainer = document.querySelector('.more-details-modal')
const moreDetailsBtnArrow = moreDetailsBtn.lastChild

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  if(searchInput.value !== '') {
    error.classList.add('hidden')

    const cityName = searchInput.value
  
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`)
    const data = await response.json()
  
    if(data.cod === '404') {
      error.classList.add('hidden')
      notFound.classList.replace('hidden', 'flex')
            
      weatherContainer.classList.contains('flex') && weatherContainer.classList.replace('flex', 'hidden')
    } else {
      notFound.classList.contains('flex') && notFound.classList.replace('flex', 'hidden')
      
      weatherContainer.classList.replace('hidden', 'flex')
      weatherContainer.classList.remove('scale-0')
      weatherContainer.classList.remove('opacity-0')
      
      city.textContent = data.name;
      switch (data.weather[0].main) {
        case 'Clear':
          imgDescription.src = '../public/images/sun.png'
          imgDescription.alt = 'soleado'
          break;
          
        case 'Rain':
          imgDescription.src = '../public/images/rain.png'
          imgDescription.alt = 'lluvioso'
          break;
            
        case 'Thunderstorm':
          imgDescription.src = '../public/images/storm.png'
          imgDescription.alt = 'tormentoso'
          break;
            
        case 'Snow':
          imgDescription.src = '../public/images/snow.png'
          imgDescription.alt = 'nieve'
          break;
          
        case 'Clouds':
          imgDescription.src = '../public/images/clouds.png'
          imgDescription.alt = 'nuboso'
          break;
          
        case 'Haze':
          imgDescription.src = './images/haze.png'
          imgDescription.alt = 'brumoso'
          break;
          
        default:
          imgDescription.alt = 'No image available'
          imgDescription.alt = 'sin imagen'
          break;
      }
    
      temperature.textContent = (parseInt(data.main.temp) - 273.15).toFixed(0) + 'ºC'
      weatherDescription.textContent = data.weather[0].main

      hPercent.textContent = data.main.humidity + '%'
      kmh.textContent = data.wind.speed + 'km/h'

      const tempMin = document.querySelector('.temp-min')
      const tempMax = document.querySelector('.temp-max')
      const tempFeel = document.querySelector('.temp-feel')
      const sunrise = document.querySelector('.sunrise')
      const sunset = document.querySelector('.sunset')

      tempMin.innerHTML = `Temp. min: <strong>${calcTemp(data.main.temp_min)}</strong>`
      tempMax.innerHTML = `Temp. max: <strong>${calcTemp(data.main.temp_max)}</strong>`
      tempFeel.innerHTML = `Feels like: <strong>${calcTemp(data.main.feels_like)}</strong>` 
      sunrise.innerHTML = `<strong>${calcTime(data.sys.sunrise)}AM</strong>`
      sunset.innerHTML = `<strong>${calcTime(data.sys.sunset)}PM</strong>`

      moreDetailsContainer.classList.replace('flex', 'hidden')
      moreDetailsContainer.classList.remove('active')
      moreDetailsBtnArrow.classList.replace('fa-circle-chevron-up', 'fa-circle-chevron-down')

      searchInput.value = ''
    }
  } else {
    notFound.classList.contains('flex') && notFound.classList.replace('flex', 'hidden')

    error.classList.remove('hidden')
  }

})

moreDetailsBtn.addEventListener('click', (e) => {
  moreDetailsContainer.classList.toggle('active')
  console.log(moreDetailsContainer.classList.contains('active'))

  if(moreDetailsContainer.classList.contains('active')) {
    moreDetailsBtnArrow.classList.replace('fa-circle-chevron-down', 'fa-circle-chevron-up')
    moreDetailsContainer.classList.replace('hidden', 'flex')
  } else {
    moreDetailsBtnArrow.classList.replace('fa-circle-chevron-up', 'fa-circle-chevron-down')
    moreDetailsContainer.classList.replace('flex', 'hidden')
  }
})

const calcTemp = (temp) => {
  const resTemp = parseInt(temp - 273.15).toFixed(0) + 'ºC'
  return resTemp
}

const calcTime = (time) => {
  const restTime = new Date(time * 1000).toLocaleTimeString().slice(0, -3)
  return restTime
}