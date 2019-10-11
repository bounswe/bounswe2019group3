#!/bin/bash

cd bounswe2019group3/project
docker-compose down
cd ..
git fetch origin production
git reset --hard origin/production
docker-compose up