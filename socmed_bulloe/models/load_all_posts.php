<?php
include 'db/dbconnect.php';

$aid = $_SESSION ['aid'];
$sql = "SELECT * FROM post WHERE aid=$aid";
$result = $con->query($sql);
$sql = "SELECT account.aid,"
      . " account.firstname," 
      . " account.lastname,"
      . " post.pid,"
      . " post.content,"
      . " post.post_date,"
      . " post.post_time,"
      . " FROM account," 
      . " INNER JOIN post ON account.aid=post.aid;";
    


while( $row=mysqli_fetch_assoc($result)){
 echo"<div class='post'>";
 echo "<div class ='post-name'>";
 echo $row['firstname']." ".$row ['lastname'];
 echo "</div>";
 echo "<div class ='post-name'>";
 echo $row['content'];
 echo "</div>";
 echo"</div>";
}
$con->close();