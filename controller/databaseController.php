<?php

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