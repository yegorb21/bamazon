DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (1, 'computer', 'tech', 1000,15);

INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (2, 'keyboard', 'tech', 100, 50);

INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (3, 'monitor', 'tech', 250,30);

INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (4, 'bed', 'home', 300, 6);

INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (5, 'rug', 'home', 80, 10);

INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (6, 'nightstand', 'home', 100,5);

INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (7, 'dresser', 'home', 200,7);

INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (8, 'sapphire reserve', 'black market', 450,15);

INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (9, 'platinum', 'black market', 550,15);

INSERT INTO  products (item_id,product_name,department_name,price,stock_quantity)
VALUES (10, 'arrival plus', 'black market', 89,15);