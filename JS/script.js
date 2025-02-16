// async function getCoordinates(city) {
   
//     const geoUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;
//     try {
//         const geoResponse = await fetch(geoUrl);
//         const geoData = await geoResponse.json();
//         if (geoData.length === 0) {
//             console.error("City not found");
//             return null;
//         }
//         return { lat: geoData[0].lat, lon: geoData[0].lon , display_name:geoData[0].display_name };
        
//     } catch (error) {
//         console.error("Error fetching coordinates:", error);
//     }
        
//     }










//To get user location
const userGeoLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
             

                const { latitude, longitude } = position.coords;
              
                resolve({ lat: latitude, lon: longitude});
            },
            (error) => {
                console.error("Error getting location:", error.message);
                document.querySelector("#weatherDetails").innerHTML=`<h2 style="margin:10px;color:red;">You must have to allow your location for current weather</h2>`
                reject(error);
            }
        );
    });
};

//
const getWeather = async () => {
        const coords = await userGeoLocation();
        if(!coords){
            console.log("Could not get user location")
        }
 
        // console.log(coords); // Now, this will log the correct coordinates

   

        const weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,rain,showers,snowfall,weathercode&hourly=temperature_2m,rain,snowfall,cloud_cover_mid,cloud_cover_high,wind_gusts_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&wind_speed_unit=ms&forecast_days=7`
     
        

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        // console.log(weatherData); // Log weather data

        

const geoLocationUrl=await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lon}&format=json`)
let geoLocation=await geoLocationUrl.json()
geoLocation=geoLocation.display_name





//Get all information from API   
//Current     

const currentTime=new Date().getHours()
const dayStatus= currentTime<=16?"Day":"Night";
const textColor= dayStatus==="Day"?"Black":"White";

const weatherCodeHandler =(weathercode) => {
   
    const backgroundImg=document.querySelector("#background")
    // const shadowColor= textColor==="Black"?"White":"Black";
    document.querySelector(".geoLocation").style.color=`${textColor}`
document.querySelector(".currentTempratureHTML").style.color=`${textColor}`
document.querySelector(".currentWeatherStatus").style.color=`${textColor}`


// console.log(textColor)



    if (weathercode === 0 || weathercode === 1) {
        const backgroundImgUrl=dayStatus==="Day"?'../Resources/daySunny.jpg':'../Resources/nightClear.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Clear sky ☁️";

    } else if (weathercode === 2 || weathercode === 3) {
         const backgroundImgUrl=dayStatus==="Day"?'../Resources/dayCloudy.jpg':'../Resources/nightCloudy.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Cloudy ☁️";
    } else if (weathercode === 45 || weathercode === 48) {
        const backgroundImgUrl=dayStatus==="Day"?'../Resources/dayCloudy.jpg':'../Resources/nightCloudy.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Fog 🌫️";
    } else if (weathercode >= 51 && weathercode <= 55) {
        const backgroundImgUrl=dayStatus==="Day"?'../Resources/dayRain.jpg':'../Resources/nightRain.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Rain Showers 🌧️";
    } else if (weathercode >= 56 && weathercode <= 57) {
         const backgroundImgUrl=dayStatus==="Day"?'../Resources/dayRain.jpg':'../Resources/nightRain.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Freezing Rain ❄️";
    } else if (weathercode === 61 || weathercode === 63 || weathercode === 65) {
         const backgroundImgUrl=dayStatus==="Day"?'../Resources/dayRain.jpg':'../Resources/nightRain.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Rain 🌧️";
    } else if (weathercode === 66 || weathercode === 67) {
         const backgroundImgUrl=dayStatus==="Day"?'../Resources/dayRain.jpg':'../Resources/nightRain.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Freezing Rain ❄️";
    } else if (weathercode === 71 || weathercode === 73 || weathercode === 75) {
         const backgroundImgUrl=dayStatus==="Day"?'../Resources/daySnow.jpg':'../Resources/nightSnow.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Snow Showers ❄️";
    } else if (weathercode === 77) {
        const backgroundImgUrl=dayStatus==="Day"?'../Resources/daySnow.jpg':'../Resources/nightSnow.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Snow Grains ❄️";
    } else if (weathercode === 80 || weathercode === 81 || weathercode === 82) {
        return "Thunderstorm ⛈️";
    } else if (weathercode === 85 || weathercode === 86) {
        const backgroundImgUrl=dayStatus==="Day"?'../Resources/daySnow.jpg':'../Resources/nightSnow.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Snow ❄️";
    } else if (weathercode === 95) {
        const backgroundImgUrl=dayStatus==="Day"?'../Resources/dayStorm.jpg':'../Resources/nightStorm.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Thunderstorm ⛈️";
    } else if (weathercode === 96 || weathercode === 99) {
         const backgroundImgUrl=dayStatus==="Day"?'../Resources/dayStorm.jpg':'../Resources/nightStorm.jpg';
        backgroundImg.style.backgroundImage=`url(${backgroundImgUrl})`
        return "Thunderstorm with Hail ⛈️";
    } else{
        return ""
    }
    
};

const currentDate=weatherData.current.time

let currentWeatherCode=weatherData.current.weathercode
console.log(currentWeatherCode)
currentWeatherCode=parseInt(currentWeatherCode)
console.log(currentWeatherCode)
const currentWeatherStatus=weatherCodeHandler(currentWeatherCode)
console.log(typeof currentWeatherCode,currentWeatherCode)
const currentTemperature=weatherData.current.temperature_2m + "°C"
document.querySelector(".geoLocation").innerText=`${geoLocation}`
document.querySelector(".currentTempratureHTML").innerText=`${currentTemperature}`
document.querySelector(".currentWeatherStatus").innerText=`${currentWeatherStatus}`
//Weekly
const sevenDaysDates=weatherData.daily.time
const sevenDaysWeatherCodes=weatherData.daily.weathercode
const sevenDaysForecastMax=weatherData.daily.temperature_2m_max
const sevenDaysForecastMin=weatherData.daily.temperature_2m_min

// console.log(sevenDaysForecastMax)
// console.log(sevenDaysForecastMin)

sevenDaysDates.forEach((date)=>{
    const dateElement=document.createElement("th")
    dateElement.innerText=`${date}`
    document.querySelector(".sevenDaysDatesContainer").appendChild(dateElement)
   
})
sevenDaysForecastMin.forEach((minWeather)=>{
    const minWeatherElement=document.createElement("td")
    minWeatherElement.innerText=`${minWeather}°C`
    document.querySelector(".sevenDaysForecastMin").appendChild(minWeatherElement)
   
})
sevenDaysForecastMax.forEach((maxWeather)=>{
    const maxWeatherElement=document.createElement("td")
    maxWeatherElement.innerText=`${maxWeather}°C`
    document.querySelector(".sevenDaysForecastMax").appendChild(maxWeatherElement)
   
})
sevenDaysWeatherCodes.forEach((weatherCode)=>{

    const nextWeatherCodeHandler = (weathercode) => {
        let weatherStatus = "";
    
        if (weathercode === 0 || weathercode === 1) {
            weatherStatus = "Clear sky ☀️";
        } else if (weathercode === 2 || weathercode === 3) {
            weatherStatus = "Cloudy ☁️";
        } else if (weathercode === 45 || weathercode === 48) {
            weatherStatus = "Fog 🌫️";
        } else if (weathercode >= 51 && weathercode <= 55) {
            weatherStatus = "Rain Showers 🌧️";
        } else if (weathercode >= 56 && weathercode <= 57) {
            weatherStatus = "Freezing Rain ❄️";
        } else if (weathercode === 61 || weathercode === 63 || weathercode === 65) {
            weatherStatus = "Rain 🌧️";
        } else if (weathercode === 66 || weathercode === 67) {
            weatherStatus = "Freezing Rain ❄️";
        } else if (weathercode === 71 || weathercode === 73 || weathercode === 75) {
            weatherStatus = "Snow Showers ❄️";
        } else if (weathercode === 77) {
            weatherStatus = "Snow Grains ❄️";
        } else if (weathercode === 80 || weathercode === 81 || weathercode === 82) {
            weatherStatus = "Thunderstorm ⛈️";
        } else if (weathercode === 85 || weathercode === 86) {
            weatherStatus = "Snow ❄️";
        } else if (weathercode === 95) {
            weatherStatus = "Thunderstorm ⛈️";
        } else if (weathercode === 96 || weathercode === 99) {
            weatherStatus = "Thunderstorm with Hail ⛈️";
        } else {
            weatherStatus = "Unknown Weather 🤷";
        }
        
        const weatherElement=document.createElement("td")
        weatherElement.innerText=`${weatherStatus}`
        document.querySelector(".sevenDaysWeatherStatus").appendChild(weatherElement)
        return weatherStatus;
    };
    
    nextWeatherCodeHandler(weatherCode)
    
})




const nextForecastPrinter=(arr)=>{
   arr.forEach(forecast => {
        const spanForNextForecast=document.createElement("span")
        spanForNextForecast.innerText=`${forecast}`
        spanForNextForecast.classList.add("spanForNextForecastMax")
        spanForNextForecast.style.color=`${textColor}`

    });
}

nextForecastPrinter(sevenDaysForecastMax)
nextForecastPrinter(sevenDaysForecastMin)






// console.log(currentDate,currentWeatherCode,currentTemperature,sevenDaysForecastMax,sevenDaysForecastMin,sevenDaysDates,sevenDaysWeatherCodes)

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

getWeather(); // Replace with user input








