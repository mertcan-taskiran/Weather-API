const cityInput = document.getElementById('inputText');
const btn = document.getElementById('icon');
const btnLoc = document.querySelector("#btnLocation");

btn.addEventListener('click', () => {
    if(cityInput.value == ""){
        alert("Enter Value!");
    }else{
        getData(cityInput.value);
    }   
});

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") { 
        event.preventDefault();
        btn.click();
    }
});

btnLoc.addEventListener("click", () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
});

function onError(err) {
    console.log(err);
}

async function onSuccess(position){
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    
    // opencage
    // const api_key = "your_api";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api_key}`;

    const response = await fetch(url);
    const data = await response.json();
    const myLocation = data.results[0].components.province;

    cityInput.value = myLocation;
    btn.click();
}

function getData(name){
    // openweathermap
    // const API = "your_api";
    const baseURL =`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric&lang=tr`;
    fetch(baseURL).then(res => res.json())
        .then(data => {
            const{name, sys:{country}, main:{temp,feels_like}, weather: [{description}], wind:{speed}} = data;
            const city = document.querySelector('#sehir');
            const temperature = document.querySelector('#sicaklik');
            const weatherDesc = document.querySelector('#havaDurumu');
            const feel = document.querySelector('#hissedilen');
            const wind = document.querySelector('#ruzgar');

            city.textContent = `Bölge: ${name}, ${country}`;
            weatherDesc.textContent = `Hava: ${description}`;
            temperature.textContent = `Derece: ${temp} °C`;
            feel.textContent = `Hissedilen Derece: ${feels_like} °C`;
            wind.textContent = `Rüzgar Hızı: ${speed}`;
        }).catch(err => console.error(err));
}