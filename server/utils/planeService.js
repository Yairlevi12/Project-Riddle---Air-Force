const axios = require('axios');
const { getDistance } = require('geolib');

async function fetchPlanes(lat, lon, radius) {
  const res = await axios.get('https://opensky-network.org/api/states/all');
  const states = res.data.states || [];
  const inRange = states
    .map(s => {
      const [icao, callsign, , , , lon2, lat2, , , velocity] = s;
      if (lat2 == null || lon2 == null) return null;
      const distance = getDistance(
        { latitude: lat, longitude: lon },
        { latitude: lat2, longitude: lon2 }
      );
      return { icao, callsign: callsign.trim(), distance, velocity };
    })
    .filter(p => p && p.distance <= radius);
  return inRange;
}

module.exports = { fetchPlanes };
