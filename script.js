const SUBMIT_BTN = document.querySelector('#submitButton');
const INPUT = document.querySelector('#input');
const WEATHER_DISPLAY = document.querySelector('.weatherDisplay')
WEATHER_DISPLAY.innerText = 'hi, my name is Kinga, I am a weatherwoman, what city are you looking for weather in?'
let cityName = "";




function printLetterByLetter(destination, message, speed){
    var i = 0;
    var interval = setInterval(function(){
        destination.innerHTML += message.charAt(i);
        i++;
        if (i > message.length){
            clearInterval(interval);
        }
    }, speed);
}

// printLetterByLetter(WEATHER_DISPLAY, "NO HEJKA SPORTOWE SWIRY", 100)




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





// window.addEventListener('load', () => {
//     let latitude;
//     let longitude;
//     WEATHER_DISPLAY.textContent = `Zezwol na dostép do lokazlizacji a powiem Ci jaka jest pogoda u Ciebie`;
    
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             latitude = position.coords.latitude;
//             longitude = position.coords.longitude;
//             getWeather(latitude, longitude);
//         })
//     } 


// })

function getWeatherByCityName(event) {
    let cityName = INPUT.value.split(" ").join("+");
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=073634a91c2b50b2af6e10147e4f385e`)
       .then(data => data.json())
       .then(
           response => {
               console.log("RESPONSE", response)
               if(response.cod == "404") {
                WEATHER_DISPLAY.innerText="";
                printLetterByLetter(WEATHER_DISPLAY, "Oh, sorry, but I can't find that city. Lets try again!", 100)
               }
               if(response.cod == "200") {
                   WEATHER_DISPLAY.innerText=""
                   let tempCom = Math.round(response.list[0].main.feels_like-273.15)<5 ? "not too warm :(" : "meh,it could be worse";
                   let text = `Now in ${INPUT.value} is temp: ${Math.round(response.list[0].main.temp-273.15)}°C
                   sensed temperature is ${Math.round(response.list[0].main.feels_like-273.15)}°C. ${tempCom}
                   Humidity: ${response.list[0].main.humidity}%
                   Pressure: ${response.list[0].main.pressure}hPa
                   If you want me to check the another temperature, just enter the city!                   `
                printLetterByLetter(WEATHER_DISPLAY, text , 100)
                  
               }
           }

       )
       .catch(err => {
           console.log("COŚ POSZŁO NIE TAK", err)
       })



}
SUBMIT_BTN.addEventListener('click', getWeatherByCityName)



