<?php
    include("config_db.php");
    session_start();

    $query = "TRUNCATE TABLE data";
    $query_1 = "TRUNCATE TABLE users";

    if ( (mysqli_query($db, $query)) && (mysqli_query($db, $query_1)) ) {
        $files = glob('../uploads/*');
        foreach ($files as $file) {
            if (is_file($file)) unlink($file);
        }
        echo "The data deleted from the database!";
    }else {
        echo "Error deleting records!".mysqli_error($db);
    }
?>
