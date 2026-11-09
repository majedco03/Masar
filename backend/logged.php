<?php
// verify if the user is logged in or not, we can use it in every page to redirect towards the login page.
session_start();
header("Content-Type: application/json");

// check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "Not logged in",
    ]);
    exit();
}

$user_name = $_SESSION["user_id"];
$user_id = $_SESSION["user_id"];

http_response_code(200);
echo json_encode([
    "status" => "logged in",
    "user_id" => $user_id,
    "user_name" => $user_name
]);
