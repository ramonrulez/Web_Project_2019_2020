<?php
	include("config_db.php");
	session_start();
	if($_SERVER["REQUEST_METHOD"] == "POST") {
	// username and password sent from form

	$myusername = mysqli_real_escape_string($db,$_POST['username']);
	$mypassword = mysqli_real_escape_string($db,$_POST['password']);

	$sql = "SELECT admin_id FROM admins WHERE username = '$myusername' and passcode = '$mypassword'";
	$result = mysqli_query($db,$sql);

	$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
	$active = $row['admin_id'];
	$count = mysqli_num_rows($result);

	// If result matched $myusername and $mypassword, table row must be 1 row

	if($count == 1) {
		$_SESSION['login_user'] = $myusername;

		header("location: welcome.php");
	}else {
		$error = "Your Login Name or Password is invalid";
		header("location:../login.html");
	}
}

// if (isset($_SESSION['session_username']))
// {
// 	echo "Έχεις κάνει ήδη login <b>".$_SESSION['session_username']."</b>! Μια φορά αρκεί.";
// 	echo "<br><a href='logoff.php'>Log off</a>";
// }
// else
// {
// 	$_SESSION['session_username'] = $_POST['username'];
// 	echo "Welcome <b>".$_SESSION['session_username'];
// 	echo "<br><a href='logoff.php'>Log off</a>";
// }
?>
