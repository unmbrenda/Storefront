drop database if exists bamazon;

create database bamazon;
use bamazon;

create table department (
	departmentId int not null auto_increment,
	departmentName VarChar(50) not null,
	overheadCosts decimal(13, 2) not null default 0,
	primary key (departmentId)
);

insert department (departmentName, overheadCosts)
values ('Clothing', 1000.00),
	('Electronics', 1000.00),
	('Health & Beauty', 100.00),
	('Office Supply', 10.00);


create table product (
	productId int not null auto_increment,
	productName varchar(50) not null,
	departmentId int,
	price decimal(13, 2) not null default 0,
	stock int,
	primary key (productId),
	foreign key (departmentId)
		references department(departmentId)
);


insert product ( productName, departmentId, price, stock )
values ('Pants', 1, 45.50, 150),
	('Underwear', 1, 3.00, 1000),
	('Radio', 2, 99.99, 20),
	('Ipad', 2, 899.99, 13),
	('Facial Cleanser', 3, 2.50, 100),
	('Eyeliner', 3, 2.99, 100),
	('Pencil', 4, 0.95, 280),
	('Notepad', 4, 1.95, 23),
	('Scissors', 4, 3.50, 2),
	('USB Drive', 2, 24.99, 60);

