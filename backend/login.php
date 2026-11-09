<?php
//  create session
session_start();
// Login script for Masar application
    header("Content-Type: application/json");

// decode the JSON data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

// get the username and password from the decoded data
    $username = $data['username'];
    $password = $data['password'];
    
// connect to the database
    $conn = new mysqli(
        "127.0.0.1",
        "root",
        "",
        "Masar",
        3306
    );

    $conn->set_charset("utf8mb4"); // this encoding is important to save arabic (although the login is most likly going to be english)

    // comprae the values with the database
    $query = "SELECT * FROM users WHERE user_name = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();


    $user = $result->fetch_assoc();

    if (!$user){
        http_response_code(400);
        echo json_encode(
                [
                    "status" => "error",
                    "message" => "اسم المستخدم غير موجود"
                ]
            );
        exit();
    }

    if ( password_verify($password, $user['password_hash']) ) {
        session_regenerate_id(true);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['user_name'];

        http_response_code(200);
        echo json_encode(
                [
                    "status" => "success",
                    "message" => "تم تسجيل الدخول بنجاح، مرحبًا بك في مسار "
                ]
            );
        
    }
    else {
        http_response_code(400);
        echo json_encode(
                [
                    "status" => "error",
                    "message" => "كلمة المرور غير صحيحة"
                ]
            );
    }     