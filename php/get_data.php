<?php
    include("config_db.php");

    session_start();
    $username = $_SESSION['username'];

    $my_json_Obj = new \stdClass();
    
    $query = "SELECT filename FROM data WHERE EXISTS (SELECT user_id FROM users WHERE username = '$username') ";
    $result = mysqli_query($db, $query);
    $filename = mysqli_fetch_assoc($result);

    $my_json_Obj-> username = $username;
    $my_json_Obj-> filename = $filename["filename"] ;

    echo json_encode($my_json_Obj);
?>
