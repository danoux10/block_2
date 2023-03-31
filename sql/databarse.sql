create DATABASE assuerPlus;
use assuerPlus;

create table user(
    idUser int(11) not null auto_increment primary key,
    name varchar(255) not null,
    lastname varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null
);

create table url(
    idUrl int(11) not null auto_increment primary key,
    image varchar(255) not null,
    user int(11) not null,
    foreign key (user) references user(idUser)
);

create table garage
(
    idGarage int(11)      not null auto_increment primary key,
    adresse  varchar(255) not null
)