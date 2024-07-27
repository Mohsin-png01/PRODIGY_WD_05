document.addEventListener("DOMContentLoaded", () => {
    let currentCity = "Lahore";
    let units = "metric";
  
    const city = document.querySelector(".weather__city");
    const datetime = document.querySelector(".weather__datetime");
    const weather__forecast = document.querySelector(".weather__forecast");
    const weather__temperature = document.querySelector(".weather__temperature");
    const weather__icon = document.querySelector(".weather__icon");
    const weather__minmax = document.querySelector(".weather__minmax");
    const weather__realfeel = document.querySelector(".weather__realfeel");
    const weather__humidity = document.querySelector(".weather__humidity");
    const weather__wind = document.querySelector(".weather__wind");
    const weather__pressure = document.querySelector(".weather__pressure");
    const weather__search = document.querySelector(".weather__search");
    
    // Initialize weather display
    getWeather();
  
    weather__search.addEventListener("submit", (e) => {
      e.preventDefault();
      const search = document.querySelector(".weather__searchform").value;
      if (search) {
        currentCity = search;
        getWeather();
        document.querySelector(".weather__searchform").value = "";
      }
    });
  
    document.querySelector(".unit__celsisus").addEventListener("click", () => {
      if (units !== "metric") {
        units = "metric";
        getWeather();
      }
    });
  
    document.querySelector(".unit__fharenheit").addEventListener("click", () => {
      if (units !== "imperial") {
        units = "imperial";
        getWeather();
      }
    });
  
    function convertCountryCode(country) {
      return new Intl.DisplayNames(["en"], { type: "region" }).of(country);
    }
  
    function convertTimestamp(timestamp, timezone) {
      const convertTimeZone = timezone / 3600;
      const date = new Date(timestamp * 1000);
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimeZone >= 0 ? "-" : "+"}${Math.abs(convertTimeZone)}`,
        hour12: true,
      };
      return date.toLocaleString("en-US", options);
    }
  
    function getWeather() {
      const API_KEY = "1d9f78e30b2044005ce9938e00c57fb2";
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === "404") {
            city.innerHTML = "City not found";
            return;
          }
          city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
          datetime.innerHTML = convertTimestamp(data.dt, data.timezone);
          weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
          weather__temperature.innerHTML = `${data.main.temp.toFixed()}&deg;`;
          weather__icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`;
          weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&deg;</p><p>Max: ${data.main.temp_max.toFixed()}&deg;</p>`;
          weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&deg;`;
          weather__humidity.innerHTML = `${data.main.humidity.toFixed()}%`;
          weather__wind.innerHTML = `${data.wind.speed.toFixed()} ${units === "imperial" ? "mph" : "m/s"}`;
          weather__pressure.innerHTML = `${data.main.pressure} hPa`;
        })
        .catch((error) => {
          city.innerHTML = "Error fetching data";
          console.error(error);
        });
    }
  });
  