var mymap = L.map('mapid').setView([14.695916170414575, -90.57783901691438], 16);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoic2FtdWVsY2FzdGlsbG9ndCIsImEiOiJja2tvbDkxaHAwMHhkMm9tYTA1bWJvdHcxIn0.b7-x19SDtVcorEa07M4ZqQ', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 25,
id: 'mapbox/satellite-v9',
tileSize: 512,
zoomOffset: -1,
accessToken: 'sk.eyJ1Ijoic2FtdWVsY2FzdGlsbG9ndCIsImEiOiJja2tvbDkxaHAwMHhkMm9tYTA1bWJvdHcxIn0.b7-x19SDtVcorEa07M4ZqQ'
}).addTo(mymap);
var marker = L.marker([14.695916170414575, -90.57783901691438]).addTo(mymap);
marker.bindPopup(`<b>Nombre</b><br>categoria<br>`).openPopup();
var popup = L.popup();
</script>
 