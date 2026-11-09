<?php
// handle regestration requests.

// header 
header("Content-Type: application/json");

// decode the json
$data = json_decode(file_get_contents("php://input"), true);

// get the user name and password, hash the password and then save the user data

$username = mb_strtolower($data["user_name"]);
$password = $data["password"];



// connect and save the user in the database.
$conn = new mysqli(
        "127.0.0.1",
        "root",
        "",
        "Masar",
        3306
    );

    // same arabic encoding supporting arabic
    $conn->set_charset("utf8mb4");

    // check if the username already exists
    $userCheckQuery = "SELECT * FROM users WHERE user_name = ?";
    $stmt = $conn->prepare($userCheckQuery);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array(
            "status" => "error",
            "message" => "اسم المستخدم موجود بالفعل، يرجى اختيار اسم مستخدم آخر"
        ));
        exit();
    } 

    // generate id using uuid
$id = bin2hex(random_bytes(16));

$hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO users (id, user_name, password_hash) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $id, $username, $hashed_password);
    $stmt->execute();
    $stmt->close();

    // return a success message
    http_response_code(200);
    echo json_encode(array(
        "status" => "success",
        "message" => "تم إنشاء الحساب بنجاح، يمكنك الآن تسجيل الدخول"
    ));
