# Stage 1: Build the Angular app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Run the app using Angular dev server
FROM node:18
WORKDIR /app
COPY --from=build /app ./
EXPOSE 4200
CMD ["npm", "run", "start"]