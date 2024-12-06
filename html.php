<?php
require './admin pane/db.php';
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    die("You must be logged in to place an order.");
}

$input = file_get_contents('php://input');
$orderData = json_decode($input, true);

if ($orderData) {
    // Prepare SQL query
    $sql = "INSERT INTO Orders (customer_name, product_name, quantity, price, total, status) VALUES (:customer_name, :product_name, :quantity, :price, :total, :status)";
    $customerName = $_SESSION['username'] ?? "Guest";
    try {
        $stmt = $pdo->prepare($sql);

        foreach ($orderData as $order) {
            $stmt->execute([
                ':customer_name' => $order['customer_name'],
                ':product_name' => $order['product_name'],
                ':quantity' => $order['quantity'],
                ':price' => $order['price'],
                ':total' => $order['total'],
                ':status' => $order['status']
            ]);
        }

        echo "Order has been placed successfully!";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "No order data received.";
}

