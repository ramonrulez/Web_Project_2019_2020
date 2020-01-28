<?php
    session_start();
    include("config_db.php");

    // define("UPLOADEDFILES", "../uploads/");
    // $file_type=$_FILES['u_file']['type'];
    // $uploadOk = 1;
    //
    //
    //
    // if (isset($_FILES['u_file']['name'])) {
    //     echo "<p>Uploading: ".$_FILES['u_file']['name']."</p>";
    //
    //     $tmpName = $_FILES['u_file']['tmp_name'];
    //     $newName = UPLOADEDFILES . $_FILES['u_file']['name'];
    //
    //     if(!is_uploaded_file($tmpName) || !move_uploaded_file($tmpName, $newName)){
    //         echo "FAILED TO UPLOAD " . $_FILES['u_file']['name'] .
    //              "<br>Temporary Name: $tmpName <br>";
    //     }else {
    //         echo "File uploaded.  Thank you!";
    //     }
    // } else {
    //     echo "You need to select a JSON file";
    // }

    $filename = $_FILES["u_file"]["name"];
    $target_dir = "../uploads/";
    $target_file = $target_dir . basename($_FILES["u_file"]["name"]);
    $extension = pathinfo($_FILES["u_file"]["name"],PATHINFO_EXTENSION);
    $uploadOk = 1;

// Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.<br>";
        $uploadOk = 0;
    }
// Check the file get_loaded_extensions
    if (!in_array($extension, ['json'])) {
        echo "You file extension must be .json";
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
            $sql = "INSERT INTO data (user_id, json) VALUES ('$user_id','$filename')";
            if (mysqli_query($db, $sql)) {
                echo "The file ". basename( $_FILES["u_file"]["name"]). " has been uploaded.";
                // echo "File uploaded successfully";
            }
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
 ?>
