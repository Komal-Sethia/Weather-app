let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelslike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// to get the actual country name
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

// to get the date and time
const getDateTime = (dt) => {
    // dt = 1751877590;
    const curDate = new Date(dt * 1000);    //convert seconds to miliseconds
    console.log(curDate);

    const options = {
        weekday : "long",
        year : "numeric",
        month : "long",
        day : "numeric",
        hour : "numeric",
        minute : "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US" , options);
    console.log(formatter);
    
    return formatter.format(curDate);
};

let city = "Surat";

// search funtionality
citySearch.addEventListener("submit" , (e) =>{
    e.preventDefault() ;    // to prevent default submission

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;

    getWeatherData();

    cityName = ""; // To clean the search bar
})

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d95beda0d5d24dc98edc3b90b06257f7`
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);
        const {main , name , weather , wind , sys ,dt} = data;

        cityName.innerHTML = `${name} , ${getCountryName(sys.country)}`;

        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = `${weather[0].main}`;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png">`;

        w_temperature.innerHTML = `${main.temp}&deg`;
        w_minTem.innerHTML =`Min : ${main.temp_min.toFixed()}&deg`;
        w_maxTem.innerHTML =`Max : ${main.temp_max.toFixed()}&deg`;

        w_feelslike.innerHTML = `${main.feels_like.toFixed(2)}&deg`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
    } catch (error) {
        console.log(error);
        
    }
}

document.body.addEventListener("load" , getWeatherData());


