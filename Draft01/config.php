

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task_management";
 
$conn = new mysqli($servername, $username, $password, $dbname,3308); 

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
