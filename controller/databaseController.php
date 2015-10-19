<?php
include 'alertController.php';

if(isset($_POST['action']) && !empty($_POST['action'])) {
	$action = $_POST['action'];
	switch($action) {
		case 'fillCities' : fillCities(); break;
	}
}

fillCities();

function getQueryResult($query){
	$conn = mysqli_connect('localhost','root','root','fejemg');	
	$result = mysqli_query($conn, $query);
	
	$array = [];
	
	while($row = mysqli_fetch_assoc($result)) array_push($array, $row['name']);	
	
	mysqli_close($conn);
	return $array;
}

function fillCities(){
	$query = "SELECT c.name FROM cities c WHERE c.state_id=11";		
	$result = getQueryResult($query);	
 	echo json_encode($result);
}