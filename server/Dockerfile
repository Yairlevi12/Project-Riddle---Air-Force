FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN npm install -g typescript ts-node
EXPOSE 4000
CMD ["ts-node", "--transpile-only", "src/index.ts"]
