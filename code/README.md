
## Running Backend
### run production env
```
docker-compose up
```

### run tests
```
docker-compose -f docker-compose.test.yml up --exit-code-from backend
```

### run development env
```
docker-compose -f docker-compose.dev.yml up
```
## Running Frontend

### run project
```
npm start
```
### run tests
```
npm test
```
### run & build project
```
npm run build
```
