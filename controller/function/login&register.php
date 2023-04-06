<?php
include_once '../../config/config.php';

if(array_key_exists('task',$_GET)){
	$task = $_GET['task'];
}

setcookie('userId',null,time());

if($task == 'register'){
	register();
}

if($task == 'login'){
	login();
}

if($task == 'deconnexion'){
	deconnexion();
}

function register(){
	global $bdd;
	$name = htmlspecialchars($_POST['name']);
	$lastname = htmlspecialchars($_POST['lastname']);
	$email = htmlspecialchars($_POST['email']);
	$password = htmlspecialchars($_POST['password']);
	$confirmPassword = htmlspecialchars($_POST['confirm-password']);
	
	if($password == $confirmPassword){
		$pass = password_hash($password, PASSWORD_BCRYPT);
		$register = $bdd->prepare('INSERT INTO user SET name=?,lastname=?,email=?,password=?');
		$register->execute([$name,$lastname,$email,$pass]);
		$error = '0';
	}else{
		$error = '1';
	}
	$res = ['error'=>$error];
	echo json_encode($res);
}

function login(){
	global $bdd;
	$email = htmlspecialchars($_POST['email']);
	$password = htmlspecialchars($_POST['password']);
	
	$takedata = $bdd->prepare('SELECT * FROM user WHERE email=?');
	$takedata -> execute([$email]);
	
	foreach ($takedata as $data){
		$userId = $data['idUser'];
		$dataPass = $data['password'];
	}
	
	if(password_verify($password,$dataPass)){
		setcookie('userId',$userId,time()+(20*365*24*60*60),'/');
		$error = '0';
	}else{
		$error = '1';
	}
	$res = ['error'=>$error];
	echo json_encode($res);
}

function deconnexion(){
	setcookie('userId',null,time()+(20*365*24*60*60),'/');
	$error = '0';
	$res = ['error'=>$error];
	echo json_encode($res);
//	header('location:index.php');
//	die();
}