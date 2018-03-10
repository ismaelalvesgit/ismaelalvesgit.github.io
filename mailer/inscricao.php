<?php 
require( 'config.php' );

if ( isset( $_POST['email'] ) ) {

	// Função para tirar as tags html dos dados do formulário

	function cleanFields( $elem ) {
		return strip_tags( $elem );
	}

	extract( array_map( 'cleanFields', $_POST ) );

	// Verifique se todos os campos são válidos (é uma verificação adicional se a validação javascript falhou)
	if ( empty( $nome ) || empty( $email ) || empty( $numero ) ) {

		echo 'fail';

	} else {

		$subject = 'Nova inscrição de ' . $nome;

		$message = '<html><body>';
		$message .= '<h2>' . $subject . '</h2><br>';
		$message .= '<table rules="all" cellpadding="10" style="border-color: #cccccc;">';
		$message .= '<tr><td style="width: 120px;">Nome</td><td><strong>' . $nome . '</strong></td></tr>';
		$message .= '<tr><td>Email</td><td><strong>' . $email . '</strong></td></tr>';
		$message .= '<tr><td>Numero</td><td><strong>' . $numero . '</strong></td></tr>';
		$message .= '<tr><td>Dias</td><td><strong>' . $dias . '</strong></td></tr>';
		$message .= '<tr><td>Como</td><td><strong>' . $como . '</strong></td></tr>';
		$message .= '<tr><td>Casulo 2018</td><td><strong>' . $espera . '</strong></td></tr>';
		$message .= '<tr><td>Linguagem</td><td><strong>' . $linguagem . '</strong></td></tr>';
		$message .= '<tr><td>Nivel</td><td><strong>' . $conhecimento . '</strong></td></tr>';
		$message .= '<tr><td>Projeto</td><td><strong>' . $projeto . '</strong></td></tr>';
		$message .= '<tr><td>Especialidade</td><td><strong>' . $especialidade . '</strong></td></tr>';
		$message .= '<tr><td>Meta</td><td><strong>' . $meta . '</strong></td></tr>';
		$message .= '<tr><td>Trabalho</td><td><strong>' . $trabalho . '</strong></td></tr>';

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

		
		$subject = 'obrigado por se increver' . $nome;

		$message = '<html><body>';
		$message .= '<h2>' . $subject . '</h2><br>';
		$message .= '<h2> obrigado por se increver ' . $nome . ' estamos muito felizes :) </h2><br>';		

		$message .= '</body></html>';

		$mail->setFrom( $to, '=?UTF-8?B?' . base64_encode( $nome ) . '?=' );
		$mail->addReplyTo( $to );

		$mail->addAddress( $email );

		if ( $mail->send() ) {
		   
		    echo 'success';
		} else {
		    echo 'fail ' . $mail->ErrorInfo;
		}

		
	}

}
