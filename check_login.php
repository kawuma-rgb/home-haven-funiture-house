<?php
session_start();

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'loggedIn' => true,
        'username' => $_SESSION['user_name'] // Send back username or other relevant info
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}

