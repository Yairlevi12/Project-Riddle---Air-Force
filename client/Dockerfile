# build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# <<< השורה הזאת מוודאת שה-build יעבור על OpenSSL-3 בלי שגיאות
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

# production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
