const SUBMIT_BTN = document.querySelector('#submitButton');
const INPUT = document.querySelector('#input');
const WEATHER_DISPLAY = document.querySelector('.weatherDisplay')

let cityName = "";

function getWeather(lat, long, apikey = "a54a5cf8aa1c0dcd3e1272b77860a1c9", lang = "pl", units = "si") {
    const cors = "https://cors-anywhere.herokuapp.com/"
    const url = "https://api.darksky.net/forecast/";

    fetch(`${cors}${url}/${apikey}/${lat},${long}?lang=${lang}&units=${units}`)
        .then(data => data.json())
        .then(data => {
            const { temperature, summary } = data.currently;
            WEATHER_DISPLAY.textContent = `${Math.round(temperature)}°C ${summary}`
        })
        .catch(()=>{
            console.log("Something went wrong...")
            
         
        });
}





window.addEventListener('load', () => {
    let latitude;
    let longitude;
    WEATHER_DISPLAY.textContent = `Zezwol na dostép do lokazlizacji a powiem Ci jaka jest pogoda u Ciebie`;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            getWeather(latitude, longitude);
        })
    } 


})

function getWeatherByCityName(event) {
    let cityName = INPUT.value.split(" ").join("+");
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=073634a91c2b50b2af6e10147e4f385e`)
       .then(data => data.json())
       .then(
           response => {
               console.log("RESPONSE", response)
               if(response.cod == "404") {

               }
               if(response.cod == "200") {
                   WEATHER_DISPLAY.textContent = `Temp: ${Math.round(response.list[0].main.temp-273.15)}°C`
               }
           }

       )
       .catch(err => {
           alert("COŚ POSZŁO NIE TAK")
       })



}
SUBMIT_BTN.addEventListener('click', getWeatherByCityName)



