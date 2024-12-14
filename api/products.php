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

$query = "SELECT * FROM products";
$result = mysqli_query($conn, $query);

if ($result) {
    $products = mysqli_fetch_all($result, MYSQLI_ASSOC);
    foreach ($products as &$product) {
        foreach ($product as &$value) {
            $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
        }
    }
    echo json_encode($products);
} else {
    echo json_encode(["error" => "Failed to execute query"]);
}
?>
