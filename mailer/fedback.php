<?php 
//require( 'config.php' );

if ( isset( $_POST['email'] ) ) {

	// Função para tirar as tags html dos dados do formulário

	function cleanFields( $elem ) {
		return strip_tags( $elem );
	}

	extract( array_map( 'cleanFields', $_POST ) );

	// Verifique se todos os campos são válidos (é uma verificação adicional se a validação javascript falhou)
	if ( empty( $email ) ) {

		echo 'fail';

	} else {

		$subject = 'Novo fedback';

		$message = '<html><body>';
		$message .= '<h2>' . $subject . '</h2><br>';
		$message .= '<table rules="all" cellpadding="10" style="border-color: #cccccc;">';
		$message .= '<tr><td style="width: 120px;">Email</td><td><strong>' . $email . '</strong></td></tr>';
        $message .= '<tr><td>Metodologia</td><td><strong>' . $metodologia . '</strong></td></tr>';
		$message .= '<tr><td>Atenção</td><td><strong>' . $atencao . '</strong></td></tr>';
		$message .= '<tr><td>Conteudo</td><td><strong>' . $conteudo . '</strong></td></tr>';
		$message .= '<tr><td>Melhorar</td><td><strong>' . $melhorar . '</strong></td></tr>';
		$message .= '<tr><td>participar</td><td><strong>' . $sugerir . '</strong></td></tr>';
		$message .= '<tr><td>Disponibilidade</td><td><strong>' . $disponibilidade . '</strong></td></tr>';

		$message .= '</table></body></html>';

		date_default_timezone_set('Etc/UTC');

		require( 'PHPMailer/PHPMailerAutoload.php' );

		$mail = new PHPMailer;

		if ( $smtp ) {
			// SMTP configuração
			$mail->isSMTP();
			$mail->Host = $smtp_host;
			$mail->Port = $smtp_port;
			$mail->SMTPSecure = $smtp_secure;
			$mail->SMTPAuth = true;
			$mail->Username = $smtp_username;
			$mail->Password = $smtp_password;
		}

		$mail->setFrom( $email, '=?UTF-8?B?' . base64_encode( $nome ) . '?=' );
		$mail->addReplyTo( $email );

		$mail->addAddress( $to );

		$mail->Subject = '=?UTF-8?B?' . base64_encode( $subject ) . '?=';
		$mail->isHTML( true );
		$mail->Body = $message;
		$mail->CharSet = 'UTF-8';

		if ( $mail->send() ) {
		    echo 'success';
		} else {
		    echo 'fail ' . $mail->ErrorInfo;
		}

	}

}