<?php
// Obtener los datos JSON enviados en la solicitud
$data = file_get_contents('php://input');

// Decodificar los datos JSON
$products = json_decode($data, true);

// Guardar los datos en el archivo JSON
file_put_contents('productos.json', json_encode($products, JSON_PRETTY_PRINT));

// Responder con un mensaje de éxito
http_response_code(200);
echo 'Datos guardados correctamente.';
?>
