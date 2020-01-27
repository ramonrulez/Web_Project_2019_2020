<?php
    session_start();

$file_type=$_FILES['u_file']['type'];

    if (isset($_FILES['u_file']['name'])) {
        echo "<p>Uploading: ".$_FILES['u_file']['name']."</p>";

        $tmpName = $_FILES['u_file']['tmp_name'];
        $newName = UPLOADEDFILES . $_FILES['u_file']['name'];

        if(!is_uploaded_file($tmpName) || !move_uploaded_file($tmpName, $newName)){
            echo "FAILED TO UPLOAD " . $_FILES['u_file']['name'] .
                 "<br>Temporary Name: $tmpName <br>";
        }else {
            echo "File uploaded.  Thank you!";
        }
    } else {
        echo "You need to select a JSON file";
    }

 ?>
