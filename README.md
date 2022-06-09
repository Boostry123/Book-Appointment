# Book-Appointment

Booking an appointment with a working database and a user/admin frielndly UI

language used : JavaScript , EJS

platform : Node.js

database: MongoDB , noSQL

using libraries : mongoose , express , passport, dotenv etc...

Version of the project : v1

the user system have been made using the passport library with high level of encrypt to passwords including hashing and salting

main page:

![image](https://user-images.githubusercontent.com/100792995/172582626-292bd8a9-ad5f-40c2-9772-9d284da36f75.png)
---------------------

this will be the normal user page:

![image](https://user-images.githubusercontent.com/100792995/172582941-f5af89c9-6954-4c4f-bd64-b919924794a3.png)

The user can make an appointment and he can also view it on his main page and remove it

---------------------

this is the admin platform :
note: the level of the user or admin is set manually by the developer in the database

![image](https://user-images.githubusercontent.com/100792995/172583556-3a53d1b3-bb68-42cf-ab66-3415a1e7f112.png)

Important things that the code knows how to do: 
1. when a user chooses a day and time of the appointment these dates wont show to another user trying to book.
2. a user cannot book more than 1 appointment he must delete the previous one to commit a new one.
3. admin platform is only to a user who is set to be an admin by the developer.

