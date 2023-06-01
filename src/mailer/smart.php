<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'alexandr-alexeev5452@mail.ru';                 // Наш логин
$mail->Password = 'sDpeKCbVFprsBNPd8FrG';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('alexandr-alexeev5452@mail.ru', 'Pulse');   // От кого письмо 
$mail->addAddress('alexandr-alexeev5452@rambler.ru');     // Add a recipient
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
	Пользователь оставил данные <br>
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>