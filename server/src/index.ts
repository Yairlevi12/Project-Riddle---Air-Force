import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import planesRouter from './routes/planes';  // <-- חיבור ה-router החדש

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

// חיבור ה-planesRouter תחת הנתיב /api/planes
app.use('/api/planes', planesRouter);

// פונקציית המרת רדיוסים ושיטת Haversine
const toRad = Math.PI / 180;
function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const dLat = (lat2 - lat1) * toRad;
  const dLon = (lon2 - lon1) * toRad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * toRad) *
      Math.cos(lat2 * toRad) *
      Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// חישוב מרחק וסגירת זמן (calculate)
app.post('/api/calculate', async (req, res) => {
  const { friendlyLat, friendlyLng, threatLat, threatLng, speed, radius } = req.body;
  const dist = distance(friendlyLat, friendlyLng, threatLat, threatLng);
  const inRange = dist <= radius;
  const closingTime = inRange ? dist / speed : null;
  res.json({ distance: dist, inRange, closingTime });
});

// שמירת אופרציה בבסיס (operations)
app.post('/api/operations', async (req, res) => {
  const { friendlyLat, friendlyLng, threatLat, threatLng, speed, radius } = req.body;
  const dist = distance(friendlyLat, friendlyLng, threatLat, threatLng);
  const inRange = dist <= radius;
  const closingTime = inRange ? dist / speed : null;

  const op = await prisma.operation.create({
    data: {
      friendlyLat,
      friendlyLng,
      threatLat,
      threatLng,
      speed,
      radius,
      distance: dist,
      inRange,
      closingTime,
    },
  });
  res.json(op);
});

// שליפת כל האופרציות
app.get('/api/operations', async (_req, res) => {
  const ops = await prisma.operation.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(ops);
});

// מאזינים בפורט
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
