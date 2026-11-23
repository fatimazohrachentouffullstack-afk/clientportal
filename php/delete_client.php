<?php
header("Content-Type: application/json; charset=UTF-8");
$file = __DIR__ . "/../data/clients.json";
$clients = json_decode(file_get_contents($file), true);
$data = json_decode(file_get_contents("php://input"), true);
$newClients = [];
$found = false;

foreach ($clients as $client) {
    if ((int)$client["id"] === (int)$data["id"]) {
        $found = true;
    } else {
        $newClients[] = $client;
    }
}

file_put_contents($file, json_encode($newClients, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
if ($found) {
    echo json_encode(["success" => true, "message" => "Client supprimé avec succès"]);
} else {
    echo json_encode(["success" => false, "message" => "Client introuvable"]);
}
?>
