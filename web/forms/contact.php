<?php

include_once('EmailNotification.php');

$emailSubject = 'Contact Form Email';

$emailNotification = new EmailNotification();

// Regular Honeypot SPAM Validation
if ($_POST['honeypot'] !== '')
{
	exit();
}

// Advanced Honeypot SPAM Validation
$honeypotVal = $_POST['h0n3yp0t'];
$honeypotKey = 'h0n3y' . $honeypotVal;
if( !isset($_POST['h0n3yp0t']) || !isset($_POST[$honeypotKey]) || $_POST[$honeypotKey] != $honeypotVal )
{
	exit();
}

// Trim input values and create variable for each field
foreach ($_POST as $name => $val) {
	$$name = trim($val);
}

// Create email notification containing all form data
$emailNotification->create(array(
	"*** Contact Form Email ***",
	"Name: " . $lastname . ", " . $firstname,
	"Email: " . $email,
	"Phone: " . $phone,
	"Message:\r\n" . $message
));

$emailNotification->send($notification, $emailSubject);

// Return status of 'success'
$returnData = array(
	'status' => 'success'
);
echo json_encode($returnData);

exit();