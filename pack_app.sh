#!/bin/sh
rm bulingo-web-*
rm -rf project/backend/frontend
cd project/frontend
npm run build
mv build/ ../backend/frontend/
cd ../backend
pkg package.json
mv bulingo-web-* ../../.
