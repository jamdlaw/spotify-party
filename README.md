# spotify party

step 1 rename .env_sample to .env and complete the missing information

step 2 database create script is saved as 
    schema.sql

run following sql to auth user on local machine:

    ALTER USER '<your_mysql_user>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<your_password>';

step 3 start backend open console at root spotify-party folder:

    $ npm run dev


step 4 cd to spotify-party inside of root folder and run:

    npm run dev
