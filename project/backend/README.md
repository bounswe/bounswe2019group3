# Backend
## 1. System Manual

### 1.1 Requirements
* NodeJS 10
* NPM
* PostgreSQL

### 1.2 Setup
1. Clone the project from Github Repository.
2. Change directory to the backend folder (bounswe2019group3/project/backend)
3. Install dependencies using the following command: ```npm install```
4. Start PostgreSQL database server
5. Database Setup - Initialize the database from the dump using one of the following commands:
- SQL:```psql -U postgres bulingo < db_dump.sql```
- TAR ```pg_restore -d bulingo db_dump.tar -c -U postgres```

### 1.3 Run the project
1. Run the following command to start the backend server: ```npm start```
2. Access the backend server on http://localhost:3000

## 2. Run Tests
```
npm test
```

## 3. Run Development Environment
```
npm run start:dev
```

## 4. DB Dump Details
#### Export
##### SQL
```
pg_dump -U postgres -w -F p bulingo > db_dump.sql
```

##### TAR
```
pg_dump -U postgres -w -F t bulingo > db_dump.tar
```

#### Import
##### SQL
```
psql -U postgres bulingo < db_dump.sql
```

##### TAR 
```
pg_restore -d bulingo db_dump.tar -c -U postgres
```