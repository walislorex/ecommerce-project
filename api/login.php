<?php
include "db.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();

$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_method === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!empty($input['email']) && !empty($input['password'])) {
        $email = mysqli_real_escape_string($conn, $input['email']);
        $password = $input['password'];

        // Query to fetch the user by email
        $query = "SELECT * FROM users WHERE email='$email'";
        $result = mysqli_query($conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);

            // Verify the password
            if (password_verify($password, $user['password_hash'])) {
                // Store user session
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'email' => $email,
                    'loggedIn' => true
                ];
                echo json_encode(["user" => $_SESSION['user']]);
            } else {
                echo json_encode(["message" => "Invalid email or password"]);
            }
        } else {
            echo json_encode(["message" => "Invalid email or password"]);
        }
    } else {
        echo json_encode(["message" => "Invalid data"]);
    }
} else {
    echo json_encode(["message" => "Method not allowed"]);
}
?>
