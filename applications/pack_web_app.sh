#!/bin/sh
rm bulingo-web-*
rm -rf web_app_code/backend/frontend
cd web_app_code/frontend
npm run build
mv build/ ../backend/frontend/
cd ../backend
pkg package.json
mv bulingo-web-* ../../.
