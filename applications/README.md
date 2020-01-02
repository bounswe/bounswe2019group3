
# Run packaged web application
1) Install PostgreSQL
Note: This application uses localhost:5432 to connect the databese
2) Setup a postgresql user with following credentials (username: postgres, password: postgres)
3) Create a database named as "bulingo"
4) Import the database dump to the database using one of the following commands:
- SQL:```psql -U postgres bulingo < db_dump.sql```
- TAR ```pg_restore -d bulingo db_dump.tar -c -U postgres```
5) Run the packaged application compatible with your operating system (linux/macos/win)
6) Access the web application on http://localhost:3000

## Note: minor changes are applied to the code in order to create the package. Therefore, we share the code for the packaged web application in the web_app_code folder.