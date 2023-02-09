# cape-ann-pizza-backend

Cape Ann Enterprises - Project for internship - Pizza Shop

Pizza Shop is web application written in javascript (node.js & express) using MySQL database. 

It offers the main CRUD operations:
- create new pizza
- read all pizzas/ pizza by id / pizza by category / pizza by search param
- update pizza info
- delete a pizza from the database

- these operations are implemented for pizza categories too

How to run the project?
- node, npm and phpmyadmin must be installed
- node modules are not provided in this repository, so you need execute some commands in your project folder:
    - npm init -y
    - npm i express
    - npm i mysql2
    - npm i dotenv
- import pizza.sql (create pizza database)  
- use .env copy file as an example for .env (insert ipaddress. database name, user and password and rename file to .env)
- run the application using node index.js
