<?php
$conn = mysqli_connect ( 'localhost', 'root', 'root', 'fejemg' );
mysqli_set_charset ( $conn, 'utf8' );

$row = 1;
$firstRow = false;
$count = 0;

if (($handle = fopen ( "fejemg.csv", "r" )) !== FALSE) {
	while ( ($data = fgetcsv ( $handle, 1000, "," )) !== FALSE ) {		
		$num = count ( $data );
		$row ++;
		if ($firstRow != false) {
			for($c = 1; $c < $num; $c ++) {				
				$sql = "INSERT INTO `fejemg`.`activity_classification` (`je_id`, `activity_id`, `classification`)
				VALUES ('$data[0]', '$firstRow[$c]', '$data[$c]')";
				echo $sql;
				echo '<br />';
				if (mysqli_query($conn, $sql)) {
					echo "Record updated successfully";
				} else {
					echo "Error updating record: " . mysqli_error($conn);
				}
			}
		}
		if ($count == 0){
			$firstRow = $data;
		}
		$count++;
	}
	fclose ( $handle );
	mysqli_close($conn);
}
