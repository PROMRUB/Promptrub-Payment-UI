# build stage
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts

COPY . .

#COPY cypress public src /app/
#COPY *.json *.js *.html *.cjs /app/

RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
USER nonroot

CMD ["nginx", "-g", "daemon off;"]
