# backend

nodeJS, expressJS, postgresql, Sequelize (ORM)

## Example Model Generation
execute the following from project directory
```
node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string:password:string,role:integer
```
```
node_modules/.bin/sequelize db:migrate
```

## Models
### auth table:
- username (id)
- email
- password_hash
- user_type

## Install Dependecies:
```
npm install
```


## Run:
```
npm start
```

## API Docs
### URL: /api/docs
### Generate:
```
npm run generate-api-docs
```
restart server after generating api docs

## Dummy Data Insertion & Deletion
```
node_modules/.bin/sequelize db:seed:all
node_modules/.bin/sequelize db:seed:undo:all
```