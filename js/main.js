$(document).ready(
		fillCities();
);

function fillCities() {
	$url = '../controller/databaseController.php'
	
	$.ajax({
		data: {action: 'fillCities'},
		type: 'post',
		url : $url,
		success : success
	});
}
