var mymap = L.map('mapid').setView([38.230462, 21.753150], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(mymap);

// var circle = L.circle([38.230462, 21.753150], {
//     fillOpacity: 0,
//     radius: 10000
// }).addTo(mymap);
