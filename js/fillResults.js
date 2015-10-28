$(window).load(function() {
 //fillResults();
});

$( "#cities" ).change(function() {
	fillResults();
});
$( "#department" ).change(function() {
	fillResults();
});
$( "#activity" ).change(function() {
	fillResults();
});

function fillResults(){
	var $select = "";
	var $url = 'controller/resultsController.php';
	var $city = $( "#cities" ).val();
	var $department = $( "#department" ).val();	
	var $activity = $( "#activity" ).val();	
	var $table;
	
	$.ajax({
		url : $url,
		data: {action: 'fillResults', city: $city, department: $department, activity: $activity},
		type: 'post',
		dataType : "json",
		success : function($result){			
			$table = buildTable($result);
			$("#ejs").hide("fast");
			$("#ejs").empty();
			$("#ejs").html($table);
			$("#ejs").show("fast");
		}
	});
}

function buildTable($result){
	var $i, $j;
	var $table = '';

	$table += '<table class="table table-striped"> <thead> <tr>'; 
	$table += '<th>Logo</th> <th>Nome</th> <th>Email</th> <th>Telefone</th> <th>Website</th> <th>Classificação</th> </tr>';
	$table += '</thead> <tbody>'
		
	for($i=0; $i<$result.length-1; $i++){
		for($j=0; $i<$result.length-1; $i++){
			if($result[$i]['abbreviation'] == $result[$j]['abbreviation'] && $i<=$j){
				console.log($result[$i]);		
				$table += '<tr>';
				$table += '<td></td>';
				$table += '<td>'+ $result[$i]['abbreviation'] +'</td>';
				$table += '<td>'+ $result[$i]['email'] +'</td>';
				$table += '<td>'+ $result[$i]['phone'] +'</td>';
				$table += '<td>'+ $result[$i]['website'] +'</td>';
				$table += '<td></td>';
				$table += '</tr>';
			} else if($result[$i]['abbreviation'] != $result[$j]['abbreviation']){
				console.log($result[$i]);		
				$table += '<tr>';
				$table += '<td></td>';
				$table += '<td>'+ $result[$i]['abbreviation'] +'</td>';
				$table += '<td>'+ $result[$i]['email'] +'</td>';
				$table += '<td>'+ $result[$i]['phone'] +'</td>';
				$table += '<td>'+ $result[$i]['website'] +'</td>';
				$table += '<td></td>';
				$table += '</tr>';				
			}			
		}
	}	      
  	$table += '</tbody>  </table>';
  	//console.log($table);	
  	return $table;
}












