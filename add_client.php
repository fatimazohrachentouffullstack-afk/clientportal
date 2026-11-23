<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = trim($_POST['nom'] ?? '');
    $email = trim($_POST['email'] ?? '');

    if (strlen($nom) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        exit('Données invalides');
    }

    $file = 'clients.json';
    $clients = json_decode(file_get_contents($file), true) ?? [];
    $clients[] = ['nom' => htmlspecialchars($nom), 'email' => $email];
    file_put_contents($file, json_encode($clients, JSON_PRETTY_PRINT));
    header('Location: index.html');
    exit;
}
