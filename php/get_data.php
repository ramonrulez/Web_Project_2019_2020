<?php
    include("config_db.php");

    session_start();
    $username = $_SESSION['username'];

    $my_json_Obj = new \stdClass();

    $query = "SELECT * FROM data WHERE user_id=(SELECT user_id FROM users WHERE username = '$username') ";
    $result = mysqli_query($db, $query);
    $user_dat = mysqli_fetch_assoc($result);

    $my_json_Obj-> username = $username;
    $my_json_Obj-> filename = $user_dat["filename"] ;
    $my_json_Obj-> upload_date = $user_dat["upload_date"] ;

    echo json_encode($my_json_Obj);
?>
