#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  npm run start:dev
fi