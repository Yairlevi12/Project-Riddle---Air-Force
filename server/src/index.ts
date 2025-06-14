import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

// חישוב מרחק וסגירה
const toRad = Math.PI / 180;
function distance(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * toRad;
  const dLon = (lon2 - lon1) * toRad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * toRad) *
      Math.cos(lat2 * toRad) *
      Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

app.post('/api/calculate', async (req, res) => {
  const { friendlyLat, friendlyLng, threatLat, threatLng, speed, radius } =
    req.body;
  const dist = distance(
    friendlyLat,
    friendlyLng,
    threatLat,
    threatLng
  );
  const inRange = dist <= radius;
  const closingTime = inRange ? dist / speed : null;
  res.json({ distance: dist, inRange, closingTime });
});

app.post('/api/operations', async (req, res) => {
  const {
    friendlyLat,
    friendlyLng,
    threatLat,
    threatLng,
    speed,
    radius,
    distance,
    inRange,
    closingTime,
  } = req.body;
  const op = await prisma.operation.create({
    data: {
      friendlyLat,
      friendlyLng,
      threatLat,
      threatLng,
      speed,
      radius,
      distance,
      inRange,
      closingTime,
    },
  });
  res.json(op);
});

app.get('/api/operations', async (req, res) => {
  const ops = await prisma.operation.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(ops);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
