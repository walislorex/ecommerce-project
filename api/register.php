<?php
include "db.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_method === 'POST') {
    // Parse JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    if (!empty($input['username']) && !empty($input['email']) && !empty($input['password'])) {
        $username = mysqli_real_escape_string($conn, $input['username']);
        $email = mysqli_real_escape_string($conn, $input['email']);
        $password = password_hash($input['password'], PASSWORD_BCRYPT); // Hash password securely

        // Insert into database
        $query = "INSERT INTO users (username, email, password_hash) VALUES ('$username', '$email', '$password')";
        if (mysqli_query($conn, $query)) {
            echo json_encode(["message" => "User created successfully"]);
        } else {
            echo json_encode(["message" => "Failed to create user"]);
        }
    } else {
        echo json_encode(["message" => "Invalid data"]);
    }
} else {
    echo json_encode(["message" => "Method not allowed"]);
}
?>
