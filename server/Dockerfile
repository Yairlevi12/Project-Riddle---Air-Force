FROM node:18
WORKDIR /app

# התקנת התלויות
COPY package*.json ./
RUN npm install

# העתקת כל שאר הקבצים ובניית הקוד לתיקיית dist
COPY . .
RUN npm run build

# הפעלת השרת מתוך dist
CMD ["node", "dist/index.js"]
