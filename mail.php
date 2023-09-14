<?php
	require 'includes/PHPMailer.php';
	require 'includes/SMTP.php';
	require 'includes/Exception.php';
	$name = $_POST['uname'];
	$surname = $_POST['usurname'];
	$email= $_POST['uemail'];
	$phone= $_POST['uphone'];
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;
	$mail = new PHPMailer(true);
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = 'hr.proficentr@gmail.com';
	$mail->Password = 'qlppgnkreykltpmg'; 
	$mail->SMTPSecure = 'ssl';
	$mail->Port = 465;
	// $mail->SMTPDebug  = 2; 
	$mail->Subject = "Profi-Center resume apply";
	$mail->setFrom("hr.proficentr@gmail.com");
	$mail->isHTML(true);
	if(isset($_FILES['attachFile']) && $_FILES['attachFile']['error'] === UPLOAD_ERR_OK && $_FILES['attachFile']['error'] !== UPLOAD_ERR_NO_FILE) {
		$mail->AddAttachment($_FILES['attachFile']['tmp_name'], $_FILES['attachFile']['name']);
	}
	$mail->Body = "Name: $name<br> Surname: $surname<br> Email: $email<br> Phone: $phone<br>";
	$mail->WordWrap = 50; 
	$mail->addAddress("hr.proficentr@gmail.com");
	if ($mail->send()) {
		echo '<script type="text/javascript">
		window.location.replace("https://hr.profischool.com.ua/#success");
		      </script>';
			  exit;
	} else {
		echo "Error: " . $mail->ErrorInfo;
	}
	$mail->smtpClose();
	?>