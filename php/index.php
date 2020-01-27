<?php
  session_start();

  if (!isset($_SESSION['username'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: ../php/login.php');
  }
  if (isset($_GET['logout'])) {
  	session_destroy();
  	unset($_SESSION['username']);
  	header("location: ../main.html");
  }
?>
<!DOCTYPE html>
<html>
    <head>
    	<title>Home</title>
    	<link rel="stylesheet" type="text/css" href="css/style.css">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>

        <div class="header">
        	<h2>Home Page</h2>
        </div>
        <div class="content">
          	<!-- notification message -->
          	<?php if (isset($_SESSION['success'])) : ?>
              <div class="error success" >
              	<h3>
                  <?php
                  	echo $_SESSION['success'];
                  	unset($_SESSION['success']);
                  ?>
              	</h3>
              </div>
          	<?php endif ?>

            <!-- logged in user information -->
            <?php  if (isset($_SESSION['username'])) : ?>
            	<p>Welcome <strong><?php echo $_SESSION['username']; ?></strong></p>
            <?php endif ?>
        </div>

        <div class="upload">
            <h3>Upload a Json file</h3>
            <form action="upload_file.php" method="POST" enctype="multipart/form-data">
                <input type="file" name="u_file">
                <input type="submit" value="Upload">
            </form>
        </div>

        <p> <a href="index.php?logout='1'" style="color: red;">logout</a> </p>

    </body>
</html>
