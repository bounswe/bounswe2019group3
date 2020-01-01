# Run the complete project with Docker Compose
## 1. System Manual
### 1.1 Requirements
- Docker
- Docker Compose

### 1.2 Setup
1. Clone the project from Github Repository.
2. Change directory to the project folder (bounswe2019group3/project)

### 1.3 Run the project
1. Run the project using the following command:
```
docker-compose up
```
2. Database Setup - Initialize the database from the dump using one of the following commands:
- SQL: ```docker exec -it bulingo_database bash -c "psql -U postgres bulingo < /home/db_dump.sql"```

- TAR: ```docker exec -it bulingo_database bash -c "pg_restore -d bulingo /home/db_dump.tar -c -U postgres"```

3. Access the applications using the following URLs:
- frontend: http://localhost/
- backend: http://localhost/api
- android: http://localhost/android/app.apk

## 2. Run Tests
```
docker-compose -f docker-compose.test.yml up --exit-code-from backend
```

## 3. Run Development Environment
```
docker-compose -f docker-compose.dev.yml up
```

## 4. DB Dump Details
#### Export
##### SQL
```
docker exec -it bulingo_database bash -c "pg_dump -U postgres -w -F p bulingo > /home/db_dump.sql"
```

##### TAR
```
docker exec -it bulingo_database bash -c "pg_dump -U postgres -w -F t bulingo > /home/db_dump.tar"
```

#### Import
##### SQL
```
docker exec -it bulingo_database bash -c "psql -U postgres bulingo < /home/db_dump.sql"
```

##### TAR 
```
docker exec -it bulingo_database bash -c "pg_restore -d bulingo /home/db_dump.tar -c -U postgres"
```