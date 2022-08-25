const searchBtn = document.querySelector(".search-btn");
const searchInput = document.getElementById("search-input");
const ipAddressValue = document.querySelector(".ip-address-value");
const locationValue = document.querySelector(".location-value");
const timezoneValue = document.querySelector(".timezone-value");
const ispValue = document.querySelector(".isp-value");

let map = L.map("map").setView([43.5, 45.3], 7);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const marker = L.marker([43.5, 45.3]).addTo(map);

searchBtn.addEventListener("click", function () {
  sortData(searchInput.value);
});

const sortData = function (ipAddress) {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_XLA6s3YhmaXeLNdIGrqLNKxFR4SDC&ipAddress=${ipAddress}`
  )
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
      ipAddressValue.textContent = res.ip;
      locationValue.textContent = `${res.location.city},${res.location.region}`;
      timezoneValue.textContent = res.location.timezone;
      ispValue.textContent = res.isp;
      map.panTo(L.latLng(res.location.lat, res.location.lng));
      marker.setLatLng(L.latLng(res.location.lat, res.location.lng));
    });
};
