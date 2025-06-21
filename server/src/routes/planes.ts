import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/nearest', async (req, res) => {
  const { lat, lon, radius } = req.query;
  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lon as string);
  const maxRadius = parseFloat(radius as string);

  if (isNaN(latitude) || isNaN(longitude) || isNaN(maxRadius)) {
    return res.status(400).json({ error: 'Missing or invalid lat, lon or radius' });
  }

  try {
    const { data } = await axios.get('https://opensky-network.org/api/states/all');

    if (!data.states || data.states.length === 0) {
      return res.json({ message: 'No threats in range' });
    }

    let closest: { icao: string; callsign: string; distance: number; velocity: number } | null = null;
    const toRad = Math.PI / 180;

    data.states.forEach((s: any) => {
      const icao = s[0];
      const callsign = s[1]?.trim();
      const lat2 = s[6];
      const lon2 = s[5];
      const velocity = s[9];

      const dLat = (lat2 - latitude) * toRad;
      const dLon = (lon2 - longitude) * toRad;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(latitude * toRad) * Math.cos(lat2 * toRad) *
        Math.sin(dLon / 2) ** 2;
      const distKm = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distM = distKm * 1000;

      if (distM <= maxRadius && (!closest || distM < closest.distance)) {
        closest = { icao, callsign, distance: distM, velocity };
      }
    });

    if (!closest) {
      return res.json({ message: 'No threats in range' });
    }

    return res.json(closest);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
