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

TODO: 

add abilty to analyze person's personality based on the last 50 songs. 
steps for app: 
* Download 50 song listen history 
* Sort list and count number of times each song is listened to
* Query spotify with song data and attached it to list with song counts
* Do some simple statistcs or sum up the over all attributes of the person's styles
    show all the data like dancablity of songs and most listend to song. if they seem to like 
    very lyrical songs etc...  
