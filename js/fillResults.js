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
	
	$.ajax({
		url : $url,
		data: {action: 'fillResults', city: $city, department: $department, activity: $activity},
		type: 'post',
		dataType : "json",
		success : function($result){
			var $i;			
			for ($i=0; $i<$result.length; $i++) {
				console.log($result[$i]);
			}
		}
	});
}