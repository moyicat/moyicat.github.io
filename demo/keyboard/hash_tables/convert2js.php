<?php 

// READ FILE
// $fileName = "../littlewords.txt";
// $fileName = "../bigwords.txt";
$fileName = "nytimes.txt";

if($fileHandle = fopen($fileName,"r")){ 
  while (!feof($fileHandle)){ 
     $dictionary[] = fgets($fileHandle,filesize($fileName)); 
  } 
  fclose($fileHandle); 
}



// WRITE FILE
$myFile = "nytimes.js";
$fh = fopen($myFile, 'w') or die("can't open file");

// $stringData = "var dictionary = {};\n";
fwrite($fh, $stringData);

for ($i=0; $i < count($dictionary); $i++) { 
// for ($i=0; $i < 5; $i++) { 
	$stringData = 'dictionary["' . substr($dictionary[$i],0,strlen($dictionary[$i])-1) . '"] = 1;' . "\n";
	// echo $stringData;// strlen($dictionary[$i]);
	fwrite($fh, $stringData);
}

fclose($fh);

?>