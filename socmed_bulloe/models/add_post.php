<?php
session_start();
include '../db/dbconnect.php';

$post = htmlspecialchars ($_POST['post-area']);
$aid = $_SESSION['aid'];

$sql = "INSERT INTO post VALUES (0,'$aid','$post',NOW(),NOW())";

$con->query($sql);

$con->close();

header("location:../profile.php");

