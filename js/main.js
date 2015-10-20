$(document).ready(function() {
	 // executes when HTML-Document is loaded and DOM is ready
	fillCities();
	fillDepartments();
});


$( "#cities" ).change(function() {
	fillDepartments();
});


function fillCities() {
	var $select = "";
	var $url = 'controller/selectController.php';
	
	$.ajax({
		url : $url,
		data: {action: 'fillCities'},
		type: 'post',
		dataType : "json",
		success : function($result){
			var $i;
			$select = '<option value=\'Todas as Cidades\'>Todas as Cidades</option>';
			for ($i=0; $i<$result.length; $i++) {
				$select += '<option value=\''+ $result[$i]+'\'>'+$result[$i]+'</option>';
			}
			var $selectCity = $('#cities'); 
			$selectCity.find('option').remove();
			$selectCity.append($select);
		}
	});
}


function fillDepartments() {
	var $select = "";
	var $url = 'controller/selectController.php';
	var $city = $( "#cities" ).val();	
	
	$.ajax({
		url : $url,
		data: {action: 'fillDepartments', city: $city},
		type: 'post',
		dataType : "json",
		success : function($result){
			var $i;
			$select = '<option value=\'Todos os Departamentos\'>Todos os Departamentos</option>';
			for ($i=0; $i<$result.length; $i++) {
				console.log($result[$i]);
				$select += '<option value=\''+ $result[$i]+'\'>'+$result[$i]+'</option>';
			}
			var $selectCity = $('#department'); 
			$selectCity.find('option').remove();
			$selectCity.append($select);
		}
	});
}


function fillActivities() {
	var $select = "";
	var $url = 'controller/selectController.php';
	
	$.ajax({
		url : $url,
		data: {action: 'fillActivities'},
		type: 'post',
		dataType : "json",
		success : function($result){
			var $i;
			$select = '<option value=\'Todas as Cidades\'>Todas as Cidades</option>';
			for ($i=0; $i<$result.length; $i++) {
				$select += '<option value=\''+ $result[$i]+'\'>'+$result[$i]+'</option>';
			}
			var $selectCity = $('#cities'); 
			$selectCity.find('option').remove();
			$selectCity.append($select);
		}
	});
}
