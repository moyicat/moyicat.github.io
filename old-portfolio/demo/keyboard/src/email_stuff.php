<?php

$attachment = $_POST["attachment"];

echo $_POST["email"];
echo $_POST["text"];

$msg_body = $_POST["text"];
$email_from = "chiselnote@gmail.com";
$name_from = "Chisel";
$subject_line = "You have received a Chisel Note!";
$address = $_POST["email"];

include("phpmailer/email_admin.php");

echo "success";





?>