<?php
$host = 'localhost';
$dbname = 'assuerPlus';
$username = 'root';
$password = 'Danoux10&*';
//$password = 'password';

try{
	$bdd= new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", "$username", "$password");
}
catch (Exception $e){
	die('Erreur : ' .$e->getMessage());
}
