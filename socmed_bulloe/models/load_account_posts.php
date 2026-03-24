<?php
include 'db/dbconnect.php';

$aid = $_SESSION ['aid'];

$sql = "SELECT * FROM post WHERE aid=$aid";

$result = $con->query($sql);

 


while( $row=mysqli_fetch_assoc($result)){
 echo"<div class='post'>";
 echo "<div class ='post-name'>";
 echo $_SESSION['firstname']." ".$_SESSION ['lastname'];
 echo "</div>";
 echo "<div class ='post-name'>";
 echo $row['content'];
 echo "</div>";
 echo"</div>";
}
$con->close();