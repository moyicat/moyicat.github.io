<?php 

// READ FILE
$fileName = "big.txt";
$bigtext = strtolower(file_get_contents($fileName));

$bigtext_sub = substr($bigtext, 0, 2000000);
// $bigtext_sub = substr($bigtext, 0, 2000);

preg_match_all('/[a-z]+/i', $bigtext_sub, $matches);
// print_r($matches);

$dictionary = array();
foreach ($matches[0] as $ii => $word) {
	if( $dictionary[$word] == null ){
		$dictionary[$word] = 1;
	}else{
		$dictionary[$word]++;
	}
}

arsort($dictionary);

print_r($dictionary);


// // WRITE FILE
// $myFile = "../bigwords.js";
// $fh = fopen($myFile, 'w') or die("can't open file");

// $stringData = "var dictionary = {};\n";
// fwrite($fh, $stringData);

// for ($i=0; $i < count($dictionary); $i++) { 
// // for ($i=0; $i < 5; $i++) { 
// 	$stringData = 'dictionary["' . substr($dictionary[$i],0,strlen($dictionary[$i])-1) . '"] = 1;' . "\n";
// 	// echo $stringData;// strlen($dictionary[$i]);
// 	fwrite($fh, $stringData);
// }

// fclose($fh);

?>