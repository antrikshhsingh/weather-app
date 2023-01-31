// const add = (a, b) => {
//   return a + b;
// };

// const firstNumber = document.getElementById("firstNumber");
// const secondNumber = document.getElementById("secondNumber");
// const button = document.querySelector("button");

// button.addEventListener("click", () => {
//   const result = add(+firstNumber.value, +secondNumber.value);
//   document.querySelector("span").innerText = result;
// });

const getWeatherData = async (lat, long) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
  let response = await fetch(api);
  let data = await response.json();
  return data;
};

const renderWeatherData = (data) => {
  document.getElementById("city-name").innerHTML = data.name;
  document.getElementById("temp").innerHTML = data.main.temp;
  document.getElementById("temp-max").innerHTML = data.main.temp_max;
  document.getElementById("temp-min").innerHTML = data.main.temp_min;
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      document.querySelector(".loader").style.display = "block";

      const data = await getWeatherData(lat, long);
      renderWeatherData(data);
      document.querySelector(".loader").style.display = "none";

      var map = L.map("map").setView([20.9716, 80.5946], 5);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      let marker = L.marker([lat, long]).addTo(map);
      marker.bindPopup(data.name).openPopup();

      async function onMapClick(e) {
        alert("Latitude : " + e.latlng.lat + "Longitude : " + e.latlng.lng);
        const data = await getWeatherData(lat, long);
        renderWeatherData(data);
        console.log(e.latlng.lat, e.latlng.lng);
      }

      map.on("click", onMapClick);
    });
  }
};

getLocation();
