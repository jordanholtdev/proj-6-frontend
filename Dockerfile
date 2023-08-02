# Build Stage for Client

FROM node:alpine as build-stage-client

ARG VITE_USERPOOL_ID
ARG VITE_CLIENT_ID
ARG VITE_AWS_REGION

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

COPY client/ .

ENV VITE_USERPOOL_ID=$VITE_USERPOOL_ID
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_AWS_REGION=$VITE_AWS_REGION

RUN npm run build

# Build stage for Server

FROM node:alpine as build-stage-server

ARG S3_BUCKET_NAME
ARG SQS_QUEUE_URL
ARG IMAGE_RESULTS_SQS_QUEUE_URL
ARG AWS_REGION

WORKDIR /app/server

COPY server/package*.json ./

RUN npm install

COPY server/ .

ENV S3_BUCKET_NAME=$S3_BUCKET_NAME
ENV SQS_QUEUE_URL=$SQS_QUEUE_URL
ENV IMAGE_RESULTS_SQS_QUEUE_URL=$IMAGE_RESULTS_SQS_QUEUE_URL
ENV AWS_REGION=$AWS_REGION

# Production Stage

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage-client /app/client/dist /usr/share/nginx/html
COPY --from=build-stage-server /app/server /app/server

COPY nginx.conf /etc/nginx/nginx.conf

RUN apk add --no-cache nodejs # Install Node.js in the nginx container to run the Express server

EXPOSE 80

COPY start-server.sh /start-server.sh
RUN chmod +x /start-server.sh

CMD ["/start-server.sh"]