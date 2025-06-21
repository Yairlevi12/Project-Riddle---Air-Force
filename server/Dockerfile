# 1. image בסיסי קל ונקי
FROM node:18-alpine

# 2. קביעת תיקיית עבודה
WORKDIR /usr/src/app

# 3. העתקת קבצי package.json ו-lockfile
COPY package.json package-lock.json* ./

# 4. התקנת כל התלויות (production ו-dev)
RUN npm install

# 5. העתקת קוד המקור
COPY . .

# 6. יצירת Prisma Client (אם יש)
RUN npx prisma generate

# 7. קומפילציית TypeScript (אם אתה משתמש ב־build)
RUN npm run build

# 8. הפקודה שמריצה את השרת
CMD ["npm", "start"]
