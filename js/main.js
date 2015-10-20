fillCities();

function fillCities() {
	var $select = "";
	var $url = 'controller/databaseController.php';
	
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
