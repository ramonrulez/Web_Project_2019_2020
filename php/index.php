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
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    </head>
    <body>
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
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

        <div class="user_data">
            <h3>User Data</h3>
            <div id="user_score"></div>
            <div id="user_entries_time"></div>
            <div id="user_last_upload"></div>
            <div id="user_leaderboard"></div>
            <script type="text/javascript" src="../js/user_content.js"></script>
        </div>

        <div class="upload">
            <h3>Upload a Json file</h3>
            <div id="mapid" style="width: 90%; height: 300px; margin: auto"></div>
                <script type="text/javascript" src="../js/upload_map.js"></script><br>
            <form action="upload_file.php" method="POST" enctype="multipart/form-data">
                <input type="file" name="u_file">
                <input type="submit" value="Upload">
            </form>
        </div>

        <p> <a href="index.php?logout='1'" style="color: red;">logout</a> </p>

    </body>
</html>
