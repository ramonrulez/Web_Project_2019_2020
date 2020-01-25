<?php include('registration.php') ?>
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
    <form name="register_form" method="post" action="registration.php">
    	  Username
    	   <input type="text" name="username"><br>
    	  Email
    	   <input type="email" name="email"><br>
    	  Password
    	   <input type="password" name="password_1"><br>
    	  Confirm password
    	   <input type="password" name="password_2"><br><br>
    	  <button type="submit" name="reg_user">Register</button>
    	<p>
    		Already a member? <a href="login.html">Sign in</a>
    	</p>
    </form>
	</body>
</html>