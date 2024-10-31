<!---Name: Amritpal Kaur-->
<!--Section - 300 CST8285-->
<!--Description: After the registeration form in index.html file passed the validation setup in register.js, the following code
                    will insert the userinformation in the users table in the task_management database using sql statments.-->
<?php
include 'config.php';
session_start();

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        $_SESSION['user_id'] = $stmt->insert_id;
        echo json_encode(['message' => 'You are registered']);
    } else {
        echo json_encode(['message' => 'Error: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
