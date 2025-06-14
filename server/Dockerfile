# Base image
FROM node:18

# עבודה בתיקיית השרת
WORKDIR /usr/src/app

# העתקת package.json ו־package-lock.json כדי לנצל cache
COPY package*.json ./

# התקנת התלויות (כולל Prisma)
RUN npm install

# העתקת סכמת Prisma כדי שנוכל להריץ generate
COPY prisma ./prisma

# יצירת ה־Prisma Client
RUN npx prisma generate

# העתקת כל שאר הקוד
COPY . .

# התקנת ts-node ו־TypeScript גלובלית
RUN npm install -g typescript ts-node

# חשיפת הפורט
EXPOSE 4000

# הרצת השרת ישירות על הקבצים של TypeScript
CMD ["ts-node", "src/index.ts"]
