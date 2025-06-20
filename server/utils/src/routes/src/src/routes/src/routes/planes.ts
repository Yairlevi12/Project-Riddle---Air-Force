import { Router, Request, Response } from 'express';
import { fetchPlanes } from '../utils/planeService';

const router = Router();

router.get('/nearest', async (req: Request, res: Response) => {
  const lat = parseFloat(req.query.lat as string);
  const lon = parseFloat(req.query.lon as string);
  const radius = parseInt(req.query.radius as string, 10);

  if (isNaN(lat) || isNaN(lon) || isNaN(radius)) {
    return res.status(400).json({ error: 'Missing or invalid lat, lon or radius' });
  }

  try {
    const planes = await fetchPlanes(lat, lon, radius);
    if (planes.length === 0) {
      return res.json({ message: 'No threats in range' });
    }
    const nearest = planes.reduce((a, b) => (a.distance < b.distance ? a : b));
    res.json(nearest);
  } catch (e) {
    res.status(500).json({ error: 'Server error', details: (e as Error).message });
  }
});

export default router;
