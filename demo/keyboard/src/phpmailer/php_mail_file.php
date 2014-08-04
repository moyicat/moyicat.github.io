<!-- How to "Use PHPMailer" -->
<!-- php_mail_file.php -->


<?php

$_REQUEST['message'] = 'hi';
$_REQUEST['name_from'] = 'Alex';
$_REQUEST['email_from'] = 'AlexWilson2012@u.northwestern.edu';


//error_reporting(E_ALL);
error_reporting(E_STRICT);

date_default_timezone_set('America/Chicago');

require_once('class.phpmailer.php');
include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded


$mail             = new PHPMailer();

// To use an HTML file as the message body
$body             = file_get_contents('contents.html');
$body             = eregi_replace("[\]",'',$body);
// To use a text input message as the message body
$body 			  = $_REQUEST['message'];

$mail->IsSMTP(); // telling the class to use SMTP
$mail->Host       = "smtp.gmail.com"; // SMTP server
$mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
                                           // 1 = errors and messages
                                           // 2 = messages only
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->Host       = "ssl://smtp.gmail.com"; // sets the SMTP server
$mail->Port       = 465;                    // set the SMTP port for the GMAIL server
$mail->Username   = "activitiesatnu@gmail.com"; // SMTP account username
$mail->Password   = "w2l6s0n!";        // SMTP account password

$mail->SetFrom($_REQUEST['email_from'], $_REQUEST['name_from']);

// $mail->AddReplyTo("activitiesatnu@gmail.com","Activities @ NU");

$mail->Subject    = 'Comment from ' . $_REQUEST['name_from'];

$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

$mail->MsgHTML($body);

$address = 'eventsatnu@gmail.com';
$mail->AddAddress($address, 'Events at NU');

// Use to add attachments
// $mail->AddAttachment("images/phpmailer.gif");      // attachment
// $mail->AddAttachment("images/phpmailer_mini.gif"); // attachment

if(!$mail->Send()) {
  $msg = "Mailer Error: " . $mail->ErrorInfo;
} else {
  $msg = "Thanks for sending us your feedback!";
}

?>

<script language="javascript" type="text/javascript">window.top.window.upload_image("<?php echo $msg; ?>");</script>   