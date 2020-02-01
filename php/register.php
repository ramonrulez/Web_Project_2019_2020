<?php include('server.php') ?>
<!DOCTYPE html>
<html>
	<head>
   	<title>Sign up Page</title>
		<link rel="stylesheet" href="../css/styles.css">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>
	    <h1>Register</h1>
	    <?php include("errors.php"); ?>
	    <form name="register_form" method="post" action="server.php">
	    	<input type="text" name="username" placeholder="Username"><br><br>
	    	<input type="email" name="email" placeholder="Email"><br><br>
	    	<input type="password" name="password_1" placeholder="Password" pattern="^(?=.*[a-z])(?=.+[A-Z])(?=.+[0-9])(?=.+[!@#$%^&*_=+-]).{8,}$"><br><br>
	    	<input type="password" name="password_2" placeholder="Retype Password"><br><br>
	    	<button type="submit" name="reg_user">Register</button>
	    	<p>
				Already a member? <a href="login.php">Login</a>
	    	</p>
	    </form>
	</body>
</html>
