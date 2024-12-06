
<?php
include './db.php';
if (isset($_POST['submit'])) {
    if (isset($_POST['categories']) && isset($_POST['productName']) && isset($_POST['stock']) && isset($_POST['Price']) && isset($_POST['status']) && isset($_FILES['ProductImage'])) {
        if (!empty($_POST['categories']) && !empty($_POST['productName']) && !empty($_POST['stock']) && !empty($_POST['Price']) && !empty($_POST['status'])&&  !empty($_FILES['ProductImage'])) {
            $categories = $_POST['categories'];
            $productName = $_POST['productName'];
            $stock = $_POST['stock'];
            $Price = $_POST['Price'];
            $status = $_POST['status'];
            if (isset($_FILES['ProductImage']) && $_FILES['ProductImage']['error'] == 0) {
                $image = $_FILES['ProductImage'];
                $target_dir = "uploads/";
                $target_file = $target_dir . basename($image['name']);
                if (move_uploaded_file($image['tmp_name'], $target_file)) {
                    $ProductImage = $target_file;
                } else {
                    echo "Error uploading the image ";
                    $ProductImage = null;
                }
            } else {
                $ProductImage = null;

            }
            try{

          
            $sql = "Insert Into products(product_name,catergory,stock,price,status,ProductImage) VALUES (:productName, :catergory, :stock, :price, :status,:ProductImage)";
            $stmt = $pdo->prepare($sql);

            // Execute the query with parameters
            $stmt->execute([
                ':productName' => $productName,
                ':catergory' => $categories,
                ':stock' => $stock,
                ':price' => $Price,
                ':status' => $status,
                ':ProductImage' => $ProductImage,
            ]);

        }catch(PDOException $e){
            echo "Error:".$e->getMessage();
        }
        } else {
            echo 'Please fill out all the fields.';
        }
    } else {
        echo 'Invalid form submission.';
    }
} else {
    echo 'Form not submitted.';
}
