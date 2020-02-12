<?php
    session_start();
    include("config_db.php");

    $target_dir = "../uploads/";
    $filename = basename($_FILES["u_file"]["name"]);
    $target_file = $target_dir . basename($_FILES["u_file"]["name"]);
    // $target_path = 'localhost/Web_Project_2019-2020/uploads' . '/' . $filename ;
    $extension = pathinfo($_FILES["u_file"]["name"],PATHINFO_EXTENSION);
    $uploadOk = 1;

// Check the file get_loaded_extensions
    if (!in_array($extension, ['json'])) {
        echo "You file extension must be .json";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.<br>";
        $uploadOk = 0;
    }

//User id
    $ses_user = $_SESSION['username'];
    $sql = "SELECT DISTINCT user_id FROM users WHERE username='$ses_user' ";
    $result = mysqli_query($db,$sql);
    $row = mysqli_fetch_row($result);
    $user_id = $row[0];

// Check if $uploadOk is set to 0
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["u_file"]["tmp_name"], $target_file)) {
            $sql = "INSERT INTO data (user_id, filename, upload_date) VALUES ('$user_id','$filename',CURRENT_DATE())";
            if (mysqli_query($db, $sql)) {
                echo "The file ". basename( $target_file). " has been uploaded.";
                // echo "File uploaded successfully";
            }
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
 ?>
