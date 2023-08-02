#!/bin/sh
node /app/server/server.js &
exec nginx -g 'daemon off;'
