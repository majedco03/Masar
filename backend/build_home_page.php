<?php
// build the home page for the user or admin.
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

// check if the user is logged in or not.
// why did I check again in the backend? 
// it is true we already checked in the frontend, but a user still can send a request directly
// to the backend, this is just double checking.

session_start();
if (!isset($_SESSION["user_id"])) {
http_response_code(400);
echo json_encode([
    "error"=> "user is not logged in"
]);
}

// get the user rule from the database.

$conn = new mysqli(
    "127.0.0.1",
    "root",
    "",
    "Masar",
    3306
);

$query = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $_SESSION["user_id"]);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    http_response_code(400);
    echo json_encode([
        "error"=> "unexpected error"
        ]);
    exit();
}
$user = $result->fetch_assoc();

$user_name = $user["user_name"];
$user_id = $user["id"];
$user_role = $user["role"];

if ($user_role == "admin") {
    // build the admin home page
    http_response_code(200);
    $html