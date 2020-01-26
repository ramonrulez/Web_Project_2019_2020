<?php include("server.php") ?>
<!DOCTYPE html>
<html>
	<head>
   	<title>Login Page</title>
		<link rel="stylesheet" href="../css/styles.css">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>
		<h1>Login Page</h1>
		<form name="login_form" action="server.php" method="post">
			Username<br>
			<input name = "username" type = "text" size = "25"><br><br>
			Password<br>
	      	<input name = "password" type = "password" size = "25"><br><br>
			<select name="user">
				<option value="user">User</option>
				<option value="admin">Admin</option>
			</select><br><br>
		    <input name ="login_user" type = "submit" value = "Login">
			<input type = "reset" value = "Clear">
			<p>
				Not yet a member? <a href="register.php">Register</a>
			</p>
		</form>
	</body>
</html>
