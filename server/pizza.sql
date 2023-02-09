create database pizza;

use pizza;

create table category (
  id binary(16) primary key,
  name nvarchar(50) not null
);

insert into category (id, name) values
(uuid_to_bin(uuid()), 'Veg'),
(uuid_to_bin(uuid()), 'Non-Veg');

create table pizza (
  id binary(16) primary key,
  name nvarchar(50) not null,  
  description nvarchar(255) not null,
  ingredients nvarchar(255) not null,
  picture_link nvarchar(255) not null,
  category_id binary(16),
  foreign key (category_id) references category (id)
);

insert into pizza (id, name, description, ingredients, picture_link, category_id) values
(uuid_to_bin(uuid()), 'Capricciosa 1', 'Description Test 1', 'tomato puree, mozzarella, cremini mushrooms, artichoke hearts, black olives', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDAVJ3XGdLctr-QKNf6bSlVj01XH6nDgtBZA&usqp=CAU', uuid_to_bin('d70bc416-7d59-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'Veggie', 'Description 2', 'Fresh tomatoes, onions, arugula, kale, eggplants, bell peppers, spinach, zucchini, mushrooms', 'https://www.twopeasandtheirpod.com/wp-content/uploads/2021/03/Veggie-Pizza-8.jpg', uuid_to_bin('d70bc416-7d59-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'Margherita', 'Description Test ', 'tomato puree, mozzarella, cremini mushrooms, artichoke hearts, black olives', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDAVJ3XGdLctr-QKNf6bSlVj01XH6nDgtBZA&usqp=CAU', uuid_to_bin('d70bc416-7d59-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'Margherita Test', 'Description 5', 'tomato puree, mozzarella, cremini mushrooms, artichoke hearts, black olives', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDAVJ3XGdLctr-QKNf6bSlVj01XH6nDgtBZA&usqp=CAU', uuid_to_bin('d70b8834-7d59-11ed-90b6-507b9df53346'));

create table pizza_rating (
  id binary(16) primary key,
  rating tinyint(4) not null,
  pizzaId binary(16),
  foreign key (pizzaId) references pizza (id)
);

insert into pizza_rating(id, rating, pizzaId) value
(uuid_to_bin(uuid()), '5', uuid_to_bin('0d503a79-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), '5', uuid_to_bin('0d503a79-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), '2', uuid_to_bin('0d500538-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), '4', uuid_to_bin('0d500538-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), '4', uuid_to_bin('0d5034f4-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), '5', uuid_to_bin('0d5034f4-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), '5', uuid_to_bin('0d50387d-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), '4', uuid_to_bin('0d50387d-7d5b-11ed-90b6-507b9df53346'));

create table pizza_size (
  id binary(16) primary key,
  size nvarchar(10) not null,
  price decimal (5,2) not null,
  pizzaId binary(16),
  foreign key (pizzaId) references pizza (id)
);

insert into pizza_size(id, size, price, pizzaId) value
(uuid_to_bin(uuid()), 'small', '10.99', uuid_to_bin('0d503a79-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'big', '17.99', uuid_to_bin('0d503a79-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'small', '12.99', uuid_to_bin('0d500538-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'big', '20.99', uuid_to_bin('0d500538-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'small', '9.99', uuid_to_bin('0d5034f4-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'big', '15.99', uuid_to_bin('0d5034f4-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'small', '10.99', uuid_to_bin('0d50387d-7d5b-11ed-90b6-507b9df53346')),
(uuid_to_bin(uuid()), 'big', '17.99', uuid_to_bin('0d50387d-7d5b-11ed-90b6-507b9df53346'));

create table users (
  id binary(16) primary key,
  email nvarchar(100) unique not null,
  password nvarchar(100) not null,
  role nvarchar(5) not null default 'user'
);

insert into users(id, email, password, role) value(uuid_to_bin(uuid()), 'admin', 'admin', 'admin');

create table orders (
  id binary(16) primary key,
  address nvarchar(100) not null,
  card nvarchar(100),
  time_placed datetime not null default current_timestamp(),
  total_price decimal (5,2) not null,
  userId binary(16),
  foreign key (userId) references users (id)
);

insert into orders(id, address, card, total_price, userId) value(uuid_to_bin(uuid()), 'Ul. Mehe Puzića 23', 'Visa', '31.98', uuid_to_bin('a84aca09-7d5d-11ed-90b6-507b9df53346'));

create table order_details (
  id binary(16) primary key,
  name nvarchar(255) not null,
  price decimal (5,2) not null,
  size nvarchar(10) not null,
  quantity int not null,
  total_price decimal (5,2) not null,
  pizzaId binary(16),
  foreign key (pizzaId) references pizza (id),
  orderId binary(16),
  foreign key (orderId) references orders (id),
  userId binary(16),
  foreign key (userId) references users (id)
);

insert into order_details(id, name, price, size, quantity, total_price, pizzaId, orderId, userId) value(uuid_to_bin(uuid()), 'Margherita', '15.99', 'big', '2', '31.98', uuid_to_bin('0d5034f4-7d5b-11ed-90b6-507b9df53346'), uuid_to_bin('955ddadf-7d5e-11ed-90b6-507b9df53346'), uuid_to_bin('a84aca09-7d5d-11ed-90b6-507b9df53346'));