// 1. Create a map object.
var mymap = L.map('map', {
    center: [39.8, -98.58],
    zoom: 5,
    maxZoom: 10,
    minZoom: 3,
    detectRetina: true});

// 2. Add a base map.
L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png').addTo(mymap);

// 3. Add cell towers GeoJSON Data
// Null variable that will hold cell tower data
var airports = null;


// 4. build up a set of colors from colorbrewer's dark2 category
var colors = chroma.scale('Dark2').mode('lch').colors(9);

// 5. dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 9; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}

// Get GeoJSON and put on it on the map when it loads
airports = L.geoJson.ajax("assets/airports.geojson", {
    // assign a function to the onEachFeature parameter of the cellTowers object.
    // Then each (point) feature will bind a popup window.
    // The content of the popup window is the value of `feature.properties.company`
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.AIRPT_NAME);
    },
    pointToLayer: function (feature, latlng) {
        var id = 2;
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane marker-color-' + (id).toString() })});
    },
    attribution: 'Airports Data &copy; catalog.gov | US Sates &copy; D3 | Base Map &copy; CartoDB | Made By Mark McDuffie'
}).addTo(mymap);


// 6. Set function for color ramp
colors = chroma.scale(colors = ['lightyellow','lightgreen']).colors(5); //colors = chroma.scale('RdPu').colors(5);

function setColor(density) {
    var id = 0;
    if (density > 20) { id = 4; }
    else if (density > 16 && density <= 20) { id = 3; }
    else if (density > 12 && density <= 16) { id = 2; }
    else if (density > 8 &&  density <= 12) { id = 1; }
    else  { id = 0; }
    return colors[id];
}


// 7. Set style function that sets fill color.md property equal to cell tower density
function style(feature) {
    return {
        fillColor: setColor(feature.properties.count),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#b4b4b4',
        dashArray: '4'
    };
}

// 8. Add
// create counties variable, and assign null to it.
var counties = null;
counties = L.geoJson.ajax("assets/us-states.geojson", {
    style: style
}).addTo(mymap);


// 9. Create Leaflet Control Object for Legend
var legend = L.control({position: 'topright'});

// 10. Function that runs when legend is added to map
legend.onAdd = function () {

    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b>Number of Airports</b><br />';
    div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>20+</p>';
    div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>17-20</p>';
    div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>13-16</p>';
    div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 9-12</p>';
    div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0- 8</p>';
    div.innerHTML += '<hr><b>Most: California (59) <b><br />';
    div.innerHTML += '<hr><b>Least: Delaware/Rhode Island (2) <b><br />';
    // Return the Legend div containing the HTML content
    return div;
};

// 11. Add a legend to map
legend.addTo(mymap);

// 12. Add a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);
