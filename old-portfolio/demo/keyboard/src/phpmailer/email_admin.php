<?php

// <!-- How to "Use PHPMailer" -->
// <!-- php_mail_file.php -->



//error_reporting(E_ALL);
error_reporting(E_STRICT);

date_default_timezone_set('America/Chicago');

require_once('class.phpmailer.php');
include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded


$mail             = new PHPMailer();

// To use an HTML file as the message body
// $body             = file_get_contents('response.html');
// $body             = eregi_replace("[\]",'',$body);
// To use a text input message as the message body
$body 			  = $msg_body;

$mail->IsSMTP(); // telling the class to use SMTP
$mail->Host       = "smtp.gmail.com"; // SMTP server
$mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
                                           // 1 = errors and messages
                                           // 2 = messages only
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->Host       = "ssl://smtp.gmail.com"; // sets the SMTP server
$mail->Port       = 465;                    // set the SMTP port for the GMAIL server
$mail->Username   = "chiselnote@gmail.com"; // SMTP account username
$mail->Password   = "asw2013!";        // SMTP account password

$mail->SetFrom($email_from, $name_from);

// $mail->AddReplyTo("activitiesatnu@gmail.com","Activities @ NU");

$mail->Subject    = $subject_line;

$alt_body = "Thanks for testing out Chisel!

We would love to hear your feedback. Please feel free to respond to this email, or fill out our Google survey below:

Thanks,

Chisel Team

Here are your notes:

" . $body . "</span>";

$mail->AltBody    = $alt_body; //"To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

$body = "<span style='font-family: verdana, sans-serif;'>
<h3>Thanks for testing out Chisel!</h3>
We would love to hear your feedback. Please feel free to respond to this email, or fill out our <a href='https://docs.google.com/forms/d/1zubCWVyoZe9NRXe2VCV3rAMRhy5hGTmUPt1_mL5VZkg/viewform?sid=5848d83832b5ec60&token=4fVY0TwBAAA.6JJlU6KvhRKLBzeNEm1aCw.liUwnWAauAixjLcPUjjKQg'>Google survey</a>.
<br>
<br>
Thanks,
<br>
Chisel Team
<br>
<br>
Here are your notes:
<br><br>
" . $body . "</span>";

$mail->MsgHTML($body);

// $address = 'eventsatnu@gmail.com';
$mail->AddAddress($address, 'Chisel User');

// Use to add attachments
$mail->AddAttachment($attachment);      // attachment
// $mail->AddAttachment("images/phpmailer_mini.gif"); // attachment

if(!$mail->Send()) {
  $msg = "Mailer Error: " . $mail->ErrorInfo;
} else {
  $msg = "Thanks for sending us your feedback!";
}

echo $msg;

?>