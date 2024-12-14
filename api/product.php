<?php
include "db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (!$conn) {
    echo json_encode(["error" => "Database connection failed: " . mysqli_connect_error()]);
    exit();
}

// Get query parameters
$categoryId = isset($_GET['category']) ? intval($_GET['category']) : null; // Sanitize category ID
$searchQuery = isset($_GET['search']) ? $_GET['search'] : null;           // Search term (if provided)

if ($categoryId  && $searchQuery) {
    $query = "SELECT * FROM products WHERE category_id = ? AND name LIKE CONCAT('%', ?, '%')";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("is", $categoryId, $searchQuery);
} elseif ($categoryId !== null) {
    $query = "SELECT * FROM products WHERE category_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $categoryId);
} elseif ($searchQuery) {
    $query = "SELECT * FROM products WHERE name LIKE CONCAT('%', ?, '%')";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $searchQuery);
} else {
    echo json_encode(["error" => "Category ID or search query is required."]);
    exit();
}

// Execute query and return results
if ($stmt->execute()) {
    $result = $stmt->get_result();
    $products = $result->fetch_all(MYSQLI_ASSOC);

    // Ensure UTF-8 encoding for all product data
    foreach ($products as &$product) {
        foreach ($product as &$value) {
            $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
        }
    }
    echo json_encode($products);
} else {
    echo json_encode(["error" => "Failed to execute query: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
