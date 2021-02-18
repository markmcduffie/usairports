# US Airports webmap
Site published at:
https://markmcduffie.github.io/usairports/
Leaflet web map of all US airports:

- First I want to acknowledge the data sources, the US government catalog
with airport locations, and Mike Bostock from D3 with the state boundaries.

- The libraries I found most helpful when making the map were chroma.js for
the color scales and GeoJSON's ajax for the icons.

- The primary function of this map is to let the user gain insight into how airports are distributed throuhgpout the US, which states have a heavy concentration of airports, and the name of any given airport.
- In order to make this choropleth map I first plotted very airport
using a plane icon over a dark background. I then attatched a popup that included the airport name feature in the text when a certain airport is clicked. The make the choropleth aspect I plotted a shapefile of US state boundaries, and divided the states into 5 classes based on the numbe rof airports in each state. I scaled these classes by color ranging from light yellow to light green, colors that will still allow these users to clearly see the airport icons.
