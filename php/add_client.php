<?php
header("Content-Type: application/json; charset=UTF-8");
$file = __DIR__ . "/../data/clients.json";
$clients = json_decode(file_get_contents($file), true);
$data = json_decode(file_get_contents("php://input"), true);

$nextId = 1;
foreach ($clients as $client) {
    if ($client["id"] >= $nextId) {
        $nextId = $client["id"] + 1;
    }
}

if (empty($data["nom"]) || empty($data["email"]) || empty($data["telephone"])) {
    echo json_encode(["success" => false, "message" => "Tous les champs sont obligatoires"]);
    exit;
}

$clients[] = [
    "id" => $nextId,
    "nom" => trim($data["nom"]),
    "email" => trim($data["email"]),
    "telephone" => trim($data["telephone"])
];

file_put_contents($file, json_encode($clients, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo json_encode(["success" => true, "message" => "Client ajouté avec succès"]);
?>
