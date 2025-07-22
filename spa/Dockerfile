# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY /package.json /package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Production stage
FROM nginx:stable
COPY --from=build /app/dist/spa/browser /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
