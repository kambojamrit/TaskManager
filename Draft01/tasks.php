<!---Name: Amritpal Kaur-->
<!--Section - 300 CST8285-->
<!--Description: This file is responsible for inserting, deleting and fetching the added tasks from the underlying database
                    i.e. task_management database. This is achieved by using sql query statements-->

<?php
include 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

$user_id = $_SESSION['user_id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $description = $_POST["description"];
    $priority = $_POST["priority"];
    $due_date = $_POST["due_date"];

    $stmt = $conn->prepare("INSERT INTO tasks (user_id, title, description, priority, due_date) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $user_id, $title, $description, $priority, $due_date);

    if ($stmt->execute()) {
        echo "Task added successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $priority = $_GET["priority"] ?? '';
    $due_date = $_GET["due_date"] ?? '';

    $query = "SELECT * FROM tasks WHERE user_id = ?";
    $params = [$user_id];
    $types = 'i';

    if (!empty($priority)) {
        $query .= " AND priority = ?";
        $params[] = $priority;
        $types .= 's';
    }

    if (!empty($due_date)) {
        $query .= " AND due_date = ?";
        $params[] = $due_date;
        $types .= 's';
    }

    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    $tasks = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($tasks);

    $stmt->close();
    $conn->close();
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    $task_id = $data["id"] ?? null;

    if ($task_id) {
        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->bind_param("i", $task_id);

        if ($stmt->execute()) {
            echo "Task removed successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Task ID is missing.";
    }

    $conn->close();
}
?>
