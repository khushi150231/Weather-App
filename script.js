let apiKey = "c83c33c603cb40e4b5230729260807";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("City");
const result = document.getElementById("weather-result");

searchBtn.addEventListener("click",  ()=> {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if (data.error) {
                result.innerHTML = "<h2>City not found!</h2>";
                return;
            }

            result.innerHTML = `
            <div class="city-name">
             <h2 class="city-box"> <i class="fa-solid fa-location-dot"></i>  ${data.location.name}, ${data.location.country}</h2>
             </div>
                <div class="detail">
                    <p class="box"><i class="fa-solid fa-temperature-half"></i> Temperature: ${data.current.temp_c} °C</p>
                    <p class="box"><i class="fa-solid fa-cloud"></i> Weather: ${data.current.condition.text}</p>
                    <p class="box"><i class="fa-solid fa-tint"></i> Humidity: ${data.current.humidity}%</p>
                    <p class="box"><i class="fa-solid fa-wind"></i> Wind: ${data.current.wind_kph} km/h</p>
                    <p class="box"><i class="fa-solid fa-clock"></i> Local Time: ${data.location.localtime}</p>
                </div>
            `;
        })
        .catch(function () {
            result.innerHTML = "<h2>Something went wrong!</h2>";
        });

});