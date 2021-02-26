# stage 1

FROM node AS buildfrontend

WORKDIR /mc11app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install 

# add app
COPY . ./
RUN npm run build

# start app
# Stage 2 - the production environment
FROM nginx:alpine

COPY --from=buildfrontend /mc11app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]