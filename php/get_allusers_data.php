<?php
    include("config_db.php");
    session_start();

    $username = $_SESSION['username'];
    $count = 0;
    $resultData = array();

    $query = "SELECT username FROM users";
    $result = mysqli_query($db, $query);

    if (mysqli_num_rows($result) > 0){
        while($users = mysqli_fetch_assoc($result)){
            $cur_user = $users["username"];
            $query = "SELECT * FROM data WHERE user_id=(SELECT user_id FROM users WHERE username = '$cur_user') ";
            $results = mysqli_query($db, $query);
            $user_dat = mysqli_fetch_assoc($results);

            $my_json_Obj = new \stdClass();
            $my_json_Obj-> username = $cur_user;
            $my_json_Obj-> filename = $user_dat["filename"] ;
            $my_json_Obj-> upload_date = $user_dat["upload_date"] ;
            array_push($resultData, $my_json_Obj);
        }
    }
    echo json_encode($resultData);
?>
