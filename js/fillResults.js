$(window).load(function() {
 fillResults();
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
	var $i;
	var $table = '';
	var $activity;

	$table += '<table class="table table-striped"> <thead> '; 
//	$table += '<tr><th>Logo</th> <th>Nome</th> <th>Email</th> <th>Telefone</th> <th>Website</th> <th>Classificação</th> </tr>';
	$table += '</thead>';
	$table += '<tbody>';
		
	for($i=0; $i<$result.length-1; $i++){
		console.log($result[$i]);	
		if($result[$i]['name'] != $activity){
			$table += '<tr class="active">';
			$table += '<td colspan="6" class="text-center lead">' + $result[$i]['name'] + '</td>';
			$table += '</tr>';
		}
		$table += '<tr>';
		$table += '<td><img src="' + $result[$i]['image'] + '" alt="Logo" class="img-logos"></td>';
		$table += '<td>'+ $result[$i]['abbreviation'] +'</td>';
		$table += '<td>'+ $result[$i]['email'] +'</td>';
		$table += '<td>'+ $result[$i]['phone'] +'</td>';
		$table += '<td>'+ $result[$i]['website'] +'</td>';
		$table += '<td>' + $result[$i]['classification'] + ' estrelas</td>';
		$table += '</tr>';
		console.log($result[$i]);
	}	      
  	$table += '</tbody>  </table>';
  	//console.log($table);	
  	return $table;
}












