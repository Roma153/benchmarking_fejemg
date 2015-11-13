$(window).load(function() {
 //Descomente o comentário abaixo para que os resultados carreguem logo no início.
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
	var $i, $j, $k;
	var $table = '';
	var $activity;

	$table += '<table class="table"> <thead> '; 
//	$table += '<tr><th>Logo</th> <th>Nome</th> <th>Email</th> <th>Telefone</th> <th>Website</th> <th>Classificação</th> </tr>';
	$table += '</thead>';
	$table += '<tbody>';
		
	for($i=0; $i<$result.length-1; $i++){
		if($activity != $result[$i]['name']){
			for($j=0; $j<$result.length-1; $j++){
				console.log($result[$i]);	
				if($result[$i]['name'] != $activity){
					$table += '<tr class="red_fejemg">';
					$table += '<td colspan="6" class="text-center lead white-text">' + $result[$i]['name'] + '</td>';
					$table += '</tr>';
					$activity = $result[$i]['name']; 
				}
				if($result[$i]['name'] == $result[$j]['name'] && $result[$j]['classification'] > 3){
					$table += '<tr>';
					$table += '<td><img src="' + $result[$j]['image'] + '" alt="'+ $result[$j]['abbreviation'] +'" class="img-logos"></td>';
					//$table += '<td><h3>'+ $result[$j]['abbreviation'] +'</h3></td>';
					$table += '<td>'+ $result[$j]['email'] +'</td>';
					$table += '<td>'+ $result[$j]['phone'] +'</td>';
					$table += '<td><a href="'+ $result[$j]['website'] +'" target="_blank">'+ $result[$j]['website'] +'</a></td>';
					$table += '<td>'; 
					for($k=0; $k<$result[$j]['classification']; $k++){
						$table += '<img src="resources/images/gold_star_icon.png" alt="' + $result[$j]['classification'] + ' estrelas">';
					}
					for($k=0; $k<5-$result[$j]['classification']; $k++){
						$table += '<img src="resources/images/gold_star_icon_lightness.png" alt="' + $result[$j]['classification'] + ' estrelas">';
					}					
					$table += '</td>';
					$table += '</tr>';
					console.log($result[$j]);
				}
			}
		}
	}	      
  	$table += '</tbody>  </table>';
  	//console.log($table);	
  	return $table;
}












