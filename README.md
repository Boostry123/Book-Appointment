# Book-Appointment

<i>Latest Updates: 
1)Admins can now create custom appointments at any given day or time.
  
2)Mobile interaction fixes in admin panel
</i>

Booking an appointment with a working database and a user/admin frielndly UI

language used : JavaScript , EJS

platform : Node.js

database: MongoDB , noSQL

using libraries : mongoose , express , passport, dotenv etc...

Version of the project : v1.0.1

the user system have been made using the passport library with high level of encrypt to passwords including hashing and salting

<h3>main page:</h3>

![image](https://user-images.githubusercontent.com/100792995/172582626-292bd8a9-ad5f-40c2-9772-9d284da36f75.png)
---------------------

<h3>this will be the normal user page:</h3>

![image](https://user-images.githubusercontent.com/100792995/172582941-f5af89c9-6954-4c4f-bd64-b919924794a3.png)

The user can make an appointment and he can also view it on his main page and remove it

---------------------

<h3>this is the admin platform :</h3>
note: the level of the user or admin is set manually by the developer in the database

![image](https://user-images.githubusercontent.com/100792995/172874605-c45b34dd-c8ce-4966-bf23-17a6379a5a1f.png)

Important things that the code knows how to do: 
1. when a user chooses a day and time of the appointment these dates wont show to another user trying to book.
2. a user cannot book more than 1 appointment he must delete the previous one to commit a new one.
3. admin platform is only to a user who is set to be an admin by the developer.
4. admin has the power to set a custome appointment at any given day or time (even if its taken)

