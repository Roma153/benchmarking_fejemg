<?php
include 'alertController.php';

function connectDatabase($server, $username, $password){
	$link = mysql_connect($server, $username, $password);
	if (!$link) {
		die('Não foi possível conectar: ' . mysql_error());
	}
	debug_to_console('Conexão bem sucedida');
	return $link;
}