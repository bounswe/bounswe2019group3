#!/bin/sh

cd project/frontend
npm run build
mv -r build ../backend/frontend
cd ../..
pkg project/backend/package.json
