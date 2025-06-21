# Use a Debian-based image so that Prisma's query engine will run
FROM node:18-bullseye-slim

WORKDIR /usr/src/app

# העתקת package.json והתקנת התלויות (כולל axios, cors, prisma וכו׳)
COPY package.json package-lock.json* ./
RUN npm install

# העתקת שאר קבצי הקוד
COPY . .

# יצירת Prisma Client
RUN npx prisma generate

# TypeScript build
RUN npm run build

# הפקודה שמריצה את השרת
CMD ["npm", "start"]
