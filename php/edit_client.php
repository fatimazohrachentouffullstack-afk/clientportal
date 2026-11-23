<?php
header("Content-Type: application/json; charset=UTF-8");
$file = __DIR__ . "/../data/clients.json";
$clients = json_decode(file_get_contents($file), true);
$data = json_decode(file_get_contents("php://input"), true);
$found = false;

foreach ($clients as &$client) {
    if ((int)$client["id"] === (int)$data["id"]) {
        $client["nom"] = trim($data["nom"]);
        $client["email"] = trim($data["email"]);
        $client["telephone"] = trim($data["telephone"]);
        $found = true;
    }
}
unset($client);

if ($found) {
    file_put_contents($file, json_encode($clients, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(["success" => true, "message" => "Client modifié avec succès"]);
} else {
    echo json_encode(["success" => false, "message" => "Client introuvable"]);
}
?>
