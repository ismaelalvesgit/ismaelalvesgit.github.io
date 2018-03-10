<?php
/* =========================================== PRINCIPAL RECEPTOR =========================================== */
$to = 'seu_email@gmail.com';						// TODO: Substitua pelo seu e-mail principal

/* ============================================ SMTP condigurações ============================================ */

$smtp = false;							// Defina TRUE se desejar usar um servidor smtp personalizado
$smtp_username = 'seu_email@gmail.com';					// Adicione seu nome de usuário smtp
$smtp_password = 'sua senha';					// Adicione sua senha smtp
$smtp_host = 'smtp.gmail.com';						// Defina o nome do host do servidor de correio (por exemplo, smtp.gmail.com)
$smtp_port = '587';						// Defina o número da porta SMTP - provavelmente será 25, 465 ou 587
$smtp_secure = 'ssl';						// Defina o sistema de criptografia para usar. Valores aceitos: 'ssl' or 'tls'