<?php
// ===================================================
// SIMARP - Formulario de Contacto
// Envía correo a ventas@simarp.net
// ===================================================

// CORS headers para permitir peticiones desde el frontend
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Responder a preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
    exit;
}

// Leer datos JSON del body
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Datos inválidos']);
    exit;
}

// Extraer y sanitizar campos
$nombre    = htmlspecialchars(strip_tags($input['Nombre'] ?? ''));
$email     = filter_var($input['Email'] ?? '', FILTER_SANITIZE_EMAIL);
$cargo     = htmlspecialchars(strip_tags($input['Cargo'] ?? 'No especificado'));
$compania  = htmlspecialchars(strip_tags($input['Compania'] ?? ''));
$flota     = htmlspecialchars(strip_tags($input['FlotaSize'] ?? 'No especificado'));
$motor     = htmlspecialchars(strip_tags($input['MotorBrand'] ?? 'No especificado'));
$mensaje   = htmlspecialchars(strip_tags($input['Mensaje'] ?? 'Sin mensaje adicional'));

// Validar campos obligatorios
if (empty($nombre) || empty($email) || empty($compania)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Faltan campos obligatorios (Nombre, Email, Compañía)']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Email inválido']);
    exit;
}

// Mapear tamaño de flota
$flotaTexto = $flota;
switch ($flota) {
    case '1':  $flotaTexto = '1 Buque'; break;
    case '3':  $flotaTexto = '2 a 5 Buques'; break;
    case '8':  $flotaTexto = '6 a 12 Buques'; break;
    case '18': $flotaTexto = 'Más de 12 Buques'; break;
}

// ===================================================
// Construir el correo
// ===================================================
$destinatario = 'ventas@simarp.net';
$asunto       = "Nueva Solicitud de Reunión - {$compania} | Simarp Mant. Predictivo";

$cuerpo = "
=====================================================
  NUEVA SOLICITUD DE REUNIÓN TÉCNICA - SIMARP
=====================================================

DATOS DEL CONTACTO
---------------------------------------------------
  Nombre:     {$nombre}
  Email:      {$email}
  Cargo:      {$cargo}
  Compañía:   {$compania}

INFORMACIÓN DE FLOTA
---------------------------------------------------
  Flota:      {$flotaTexto}
  Motor:      {$motor}

MENSAJE ADICIONAL
---------------------------------------------------
{$mensaje}

=====================================================
Enviado desde: mant-predictivo.simarp.net
Fecha/Hora:    " . date('Y-m-d H:i:s T') . "
IP Origen:     " . ($_SERVER['REMOTE_ADDR'] ?? 'desconocida') . "
=====================================================
";

// Headers del correo
$headers  = "From: Simarp Web <noreply@simarp.net>\r\n";
$headers .= "Reply-To: {$nombre} <{$email}>\r\n";
$headers .= "X-Mailer: Simarp-ContactForm/1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Enviar
$enviado = mail($destinatario, $asunto, $cuerpo, $headers);

if ($enviado) {
    http_response_code(200);
    echo json_encode(['ok' => true, 'message' => 'Correo enviado exitosamente']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'No se pudo enviar el correo. Verifique la configuración del servidor.']);
}
