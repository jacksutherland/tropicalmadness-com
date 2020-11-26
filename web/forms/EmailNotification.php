<?php
class EmailNotification
{
	public $testAddress;
	public $emailBody;
	
	public function __construct()
	{
	}
	
	public function create($emailLines)
	{
		$this->emailBody = "";
		foreach ($emailLines as $line)
		{
			$this->emailBody.= $line . "\r\n";
		}
	}
	
	public function send($emailTo, $emailSubject)
	{
		if ($this->testAddress) $emailTo = $this->testAddress;
		
		$emailHeaders = 'MIME-Version: 1.0' . "\r\n";
		$emailHeaders.= 'Content-type: text/plain; charset=iso-8859-1' . "\r\n";
		$emailHeaders.= 'From: proto@craftedagency.com' . "\r\n" . 'Reply-To: proto@craftedagency.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion();
		
		mail($emailTo, $emailSubject, $this->emailBody, $emailHeaders, "-f proto@craftedagency.com");
	}
}