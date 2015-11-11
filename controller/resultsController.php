<?php
include 'alertController.php';
include 'databaseController.php';

if(isset($_POST['city']) && $_POST['department'] && $_POST['activity']) {
	$city = $_POST['city'];
	$department = $_POST['department'];
	$activity = $_POST['activity'];

	if($city == 'Todas as Cidades' && $department == 'Todos os Departamentos' &&
			$activity == 'Todas as Atividades'){
		$query = "SELECT DISTINCT *
				FROM cities c, junior_enterprises je, activity_classification ac,
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id
				ORDER BY ac.classification  DESC, je.abbreviation
				LIMIT 100";
	} else if($city == 'Todas as Cidades' && $department == 'Todos os Departamentos'){
		$query = "SELECT DISTINCT *
				FROM cities c, junior_enterprises je, activity_classification ac,
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND a.name='".$activity."'
				ORDER BY ac.classification  DESC, je.abbreviation
				LIMIT 100";
	} else if($city == 'Todas as Cidades' && $activity == 'Todas as Atividades'){
		$query = "SELECT DISTINCT *
				FROM cities c, junior_enterprises je, activity_classification ac,
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND d.name='".$department."'
				ORDER BY ac.classification  DESC, je.abbreviation
				LIMIT 100";
	} else if($department == 'Todos os Departamentos' && $activity == 'Todas as Atividades'){
		$query = "SELECT DISTINCT *
				FROM cities c, junior_enterprises je, activity_classification ac,
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id  AND c.name='".$city."'
				ORDER BY ac.classification  DESC, je.abbreviation
				LIMIT 100";
	} else if($city == 'Todas as Cidades'){
		$query = "SELECT DISTINCT *
				FROM cities c, junior_enterprises je, activity_classification ac,
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND d.name='".$department."' AND a.name='".$activity."' 
				ORDER BY ac.classification  DESC, je.abbreviation
				LIMIT 1000";
	} else if($activity == 'Todas as Atividades'){
		$query = "SELECT DISTINCT *
				FROM cities c, junior_enterprises je, activity_classification ac,
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND d.name='".$department."' AND c.name='".$city."' 
				ORDER BY ac.classification  DESC, je.abbreviation
				LIMIT 1000";
	} else if($department == 'Todos os Departamentos'){
		$query = "SELECT DISTINCT *
				FROM cities c, junior_enterprises je, activity_classification ac,
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND a.name='".$activity."' AND c.name='".$city."' 
				ORDER BY ac.classification  DESC, je.abbreviation
				LIMIT 1000";
	} else {
		$query = "SELECT DISTINCT *
				FROM cities c, junior_enterprises je, activity_classification ac,
					department d, activity a
				WHERE je.city_id=c.id AND ac.je_id=je.id AND ac.activity_id=a.id AND
					a.department_id=d.id AND a.name='".$activity."' AND c.name='".$city."' 
							AND d.name='".$department."'
				ORDER BY ac.classification  DESC, je.abbreviation
				LIMIT 100";
	}
}

$result = getQueryResultComplete($query);
echo json_encode($result);
