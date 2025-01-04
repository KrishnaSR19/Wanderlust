
  /* // Replace '6znCyIYPjpvHLo3kbb1p' with your valid API key if necessary */
let apiKey = mapToken;
console.log(apiKey);
mapboxgl.accessToken = apiKey;

const map = new mapboxgl.Map({
  container: "map",
  style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${apiKey}`,
  center: [77.2088, 28.6139], // Initial map center [longitude, latitude]
  zoom: 9, // Initial zoom level
});

// Optional: Add navigation controls
map.addControl(new mapboxgl.NavigationControl());
