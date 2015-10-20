<?php
include 'alertController.php';


if(isset($_POST['action'])) {
	$action = $_POST['action'];
	switch($action) {
		case 'fillCities' : fillCities(); break;
		case 'fillDepartments' : fillDepartments(); break;
		case 'fillActivities' : fillActivities(); break;
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


function fillDepartments(){	
	if(isset($_POST['city'])) {
		$city = $_POST['city'];
		
		if($city == 'Todas as Cidades'){
			$query = "SELECT DISTINCT d.name
				FROM cities c, junior_enterprises je, activity_classification ac, 
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id 
				ORDER BY d.name";
		} else {
			$query = "SELECT DISTINCT d.name
				FROM cities c, junior_enterprises je, activity_classification ac, 
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND c.name='" . $city . "'
				ORDER BY d.name";
		}
	}
		
	$result = getQueryResult($query);	
	echo json_encode($result);
}


function fillActivities(){
	if(isset($_POST['city']) && $_POST['department']) {
		$city = $_POST['city'];
		$department = $_POST['department'];
		
		if($city == 'Todas as Cidades' && $department == 'Todos os Departamentos'){
			$query = "SELECT DISTINCT a.name
				FROM cities c, junior_enterprises je, activity_classification ac, 
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id 
				ORDER BY a.name";
		} else if($city == 'Todas as Cidades'){
			$query = "SELECT DISTINCT a.name
				FROM cities c, junior_enterprises je, activity_classification ac, 
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND d.name='".$department."'
				ORDER BY a.name";
		} else if($department == 'Todos os Departamentos'){
			$query = "SELECT DISTINCT a.name
				FROM cities c, junior_enterprises je, activity_classification ac, 
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND c.name='".$city."'
				ORDER BY a.name";
		} else {
			$query = "SELECT DISTINCT a.name
				FROM cities c, junior_enterprises je, activity_classification ac, 
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND c.name='".$city."' AND d.name='".$department."' 
				ORDER BY a.name";
		}
	}
		
	$result = getQueryResult($query);	
	echo json_encode($result);
}














