<?php
header("Content-Type: application/json; charset=UTF-8");
$file = __DIR__ . "/../data/clients.json";
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}
$clients = json_decode(file_get_contents($file), true);
echo json_encode($clients);
?>
