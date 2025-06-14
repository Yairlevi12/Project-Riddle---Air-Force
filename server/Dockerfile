FROM node:18

# עבודה בתיקיית אֶפְּלוּצֶיה של השרת
WORKDIR /usr/src/app

# העתקת תלויות
COPY package*.json ./

# התקנת תלויות רגילות + dev (כולל typescript ו־ts-node)
RUN npm install

# התקנת ts-node גלובלי כדי להריץ .ts ישירות
RUN npm install -g typescript ts-node

# העתקת שאר הקוד
COPY . .

# חשיפת הפורט
EXPOSE 4000

# הרצת הקוד ישירות עם ts-node
CMD ["ts-node", "src/index.ts"]
