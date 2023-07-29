#!/bin/sh
node /app/server/app.js &
exec nginx -g 'daemon off;'
