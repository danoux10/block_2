<?php
include_once '../../config/config.php';

if(array_key_exists('task',$_GET)){
	$task = $_GET['task'];
}

if($task == 'sinistre'){
	sinistre();
}

function sinistre(){
	global $bdd;
	$dir = '../../image/';
	foreach ($_FILES['photo']['tmp_name'] as $key=>$tmp_name){
		$fileName = $_FILES['photo']['name'][$key];
		$fileTmp = $_FILES['photo']['tmp_name'][$key];
		$fileSize = $_FILES['photo']['size'][$key];
		$fileExt = strtolower(pathinfo($fileName,PATHINFO_EXTENSION));
		$new_filename = uniqid().'.'.$fileExt;
		$destination = $dir.$new_filename;
		move_uploaded_file($fileTmp, $destination);
		$insertImage = $bdd->prepare('INSERT INTO url set image=?,user=?');
		$userId = $_COOKIE['userId'];
		$insertImage->execute([$destination,$userId]);
	}
	$error = '0';
	$res = ['error' => $error];
	echo json_encode($res);
}