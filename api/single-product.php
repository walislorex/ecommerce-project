<?php
include "db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (!$conn) {
    echo json_encode(["error" => "Database connection failed: " . mysqli_connect_error()]);
    exit();
}

// Get product ID from the query parameters
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(["error" => "Valid product ID is required."]);
    exit();
}

$productId = intval($_GET['id']); // Sanitize the input

// Use a prepared statement to prevent SQL injection
$query = "SELECT * FROM products WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $productId);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
        // Convert data to UTF-8 to avoid encoding issues
        foreach ($product as &$value) {
            $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
        }
        echo json_encode($product);
    } else {
        echo json_encode(["error" => "Product not found."]);
    }
} else {
    echo json_encode(["error" => "Failed to execute query."]);
}

$stmt->close();
$conn->close();
?>
