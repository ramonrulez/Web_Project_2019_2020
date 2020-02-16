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
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js" integrity="sha256-nZaxPHA2uAaquixjSDX19TmIlbRNCOrf5HO1oHl5p70=" crossorigin="anonymous"></script>
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

        <div class="user_data">
            <h3>User Data</h3>
            <div id="user_score"></div>
            <canvas id="myChart" style="width: 90%; height: 300px; margin: auto"></canvas>
            <div id="user_entries_time"></div>
            <div id="user_last_upload"></div>
            <div id="user_leaderboard"></div>
            <div id="user_position"></div>
        </div><br>

        <div class="data_analysis">
            <h3>Data Analysis</h3>
            <canvas id="percentage_chart" style="width: 90%; height: 300px; margin: auto"></canvas>
            <div id="record_percentage">
                <div id="date_results"></div>
                <div id="date_form">
                    <form name="date_range" onsubmit="dateRange()" method="post">
                        <select id="month_1"name="fromMonth">
                            <!-- <select id="fromMonthSelect"name="fromMonth" onchange="untilMonth()"> -->
            				<option value="0">Jan</option>
            				<option value="1">Feb</option>
                            <option value="2">Mar</option>
                            <option value="3">Apr</option>
                            <option value="4">May</option>
                            <option value="5">Jun</option>
                            <option value="6">Jul</option>
                            <option value="7">Aug</option>
                            <option value="8">Sep</option>
                            <option value="9">Oct</option>
                            <option value="10">Nov</option>
                            <option value="11">Dec</option>
                        </select>
                        <label for="untilMonth"> : </label>
                        <select id="month_2" name="untilMonth">
                            <option class="month" value="0">Jan</option>
            				<option class="month" value="1">Feb</option>
                            <option class="month" value="2">Mar</option>
                            <option class="month" value="3">Apr</option>
                            <option class="month" value="4">May</option>
                            <option class="month" value="5">Jun</option>
                            <option class="month" value="6">Jul</option>
                            <option class="month" value="7">Aug</option>
                            <option class="month" value="8">Sep</option>
                            <option class="month" value="9">Oct</option>
                            <option class="month" value="10">Nov</option>
                            <option class="month" value="11">Dec</option>
                        </select>
                        <div>
                            <div id="year_1">
                                <?php
                                    $currently_selected = date('Y');
                                    $earliest_year = 2000;
                                    $latest_year = date('Y');
                                    print '<select name="fromYear">';
                                    foreach (range($latest_year,$earliest_year)as $i){
                                        print '<option value="' . $i . '"' . ($i === $currently_selected ? 'selected="selected"' : '').'>' . $i . '</option>';
                                    }
                                    print '<select>'
                                 ?>
                            </div>
                            <div id="year_2">
                                <?php
                                    $currently_selected = date('Y');
                                    $earliest_year = 2000;
                                    $latest_year = date('Y');
                                    print '<select  name="untilYear">';
                                    foreach (range($latest_year,$earliest_year)as $i){
                                        print '<option value="' . $i . '"' . ($i === $currently_selected ? 'selected="selected"' : '').'>' . $i . '</option>';
                                    }
                                    print '<select>'
                                 ?>
                            </div>
                        </div><br>
                        <input type="submit" value="Submit">
                    </form>
                </div>
            </div>
            <div id="time_of_day"></div>
            <div id="day_of_weak"></div>
        </div>

        <div class="upload">
            <h3>Upload a Json file</h3>
            <div id="mapid" style="margin: auto"></div>
            <script type="text/javascript" src="../js/upload_map.js"></script><br>
            <form action="upload_file.php" method="POST" enctype="multipart/form-data">
            <!-- <form action="upload_file.php" onsubmit="dateRange()" method="POST" enctype="multipart/form-data"> -->
                <input type="file" name="u_file" onclick="seeMap()">
                <input type="submit" value="Upload">
            </form>
        </div>
        <script type="text/javascript" src="../js/user_content.js"></script>

        <p> <a href="index.php?logout='1'" style="color: red;">logout</a> </p>

    </body>
</html>
