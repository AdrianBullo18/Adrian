<?php

include  '../db/dbconnect.php';

$email = $_POST['email'];
$fn = $_POST['firstname'];
$ln = $_POST['lastname'];
$pass = $_POST ['password'];
$cpass = $_POST ['cpassword'];

$sql = "INSERT INTO account VALUES (0,'$email','$fn','$ln','$pass')";

$con->query($sql);

$con->close();

header("location:../login.php");