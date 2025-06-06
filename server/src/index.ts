import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

// Helper: calculate distance (Haversine)
function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // in meters
}

app.post('/api/calculate', async (req: Request, res: Response) => {
  const { friendlyLat, friendlyLng, threatLat, threatLng, speed, radius } = req.body;
  const distance = haversineDistance(friendlyLat, friendlyLng, threatLat, threatLng);
  const withinThreat = distance <= radius;
  const closureTime = speed > 0 ? distance / speed : null;

  res.json({ distance, withinThreat, closureTime });
});

app.post('/api/save', async (req: Request, res: Response) => {
  const { friendlyLat, friendlyLng, threatLat, threatLng, speed, radius } = req.body;
  const operation = await prisma.operation.create({
    data: { friendlyLat, friendlyLng, threatLat, threatLng, speed, radius }
  });
  res.json(operation);
});

app.get('/api/operations', async (_req: Request, res: Response) => {
  const operations = await prisma.operation.findMany({ orderBy: { timestamp: 'desc' } });
  res.json(operations);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));