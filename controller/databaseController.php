<?php
include 'alertController.php';

if(isset($_POST['action']) && !empty($_POST['action'])) {
	$action = $_POST['action'];
	switch($action) {
		case 'fillCities' : fillCities(); break;
	}
}

function getQueryResult($query){
	$conn = mysqli_connect('localhost','root','root','fejemg');	
	mysqli_set_charset($conn, 'utf8');
	$result = mysqli_query($conn, $query);
	
	$array = [];
	
	while($row = mysqli_fetch_assoc($result)){
		array_push($array, $row['name']);
	}
	
	mysqli_close($conn);
	return $array;
}

function fillCities(){
	$query = "SELECT DISTINCT c.name
				FROM cities c, junior_enterprises je, activity_classification ac
				WHERE je.city_id=c.id AND ac.je_id=je.id
				ORDER BY c.name";		
	$result = getQueryResult($query);
	
	echo json_encode($result);
}














