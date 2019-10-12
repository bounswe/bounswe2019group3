#!/bin/bash

cd bounswe2019group3/project
docker-compose down
cd ../..
sudo rm -rf bounswe2019group3
git clone --depth=50 --branch=production https://github.com/bounswe/bounswe2019group3.git
cd bounswe2019group3/project
docker-compose up -d --force-recreate --build