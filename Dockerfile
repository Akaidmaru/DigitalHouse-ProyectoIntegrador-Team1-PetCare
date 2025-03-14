# Description: Dockerfile for the frontend application
# Stage 1: Build the application
FROM node:22.14.0-alpine AS build
WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}


COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2: Serve the application with nginx
FROM nginx:1.27.4-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
