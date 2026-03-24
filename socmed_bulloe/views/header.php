<?php session_start(); ?>
<!DOCTYPE html>
<html>
        <head>
        <meta charset="UTF-8">
        <title>socmed e</title>
        <link href="views/res/styles.css" rel="stylesheet" type="text/css"/>
    </head>
<body></body>
        <div class="nav">
            <div class="nav-left">
                <ul>
                    <a href="timeline.php">
                        <li class="logo">&nbsp;</li>
                        </a>
                    <a href="timeline.php">
                        <li>Socmed</li>
                    </a>
                </ul>
            </div>
            <div class="nav-right">
                <?php 
                    if(isset($_SESSION['aid'])){
                ?>
                <ul>
                    <a href="profile.php">
                    <li><?= $_SESSION['firstname']; ?></li>
                </a>
                    <a href="models/logout_account.php">
                    <li>Logout</li>
                </a>
                </ul>
                <?php }else{ ?>
                <ul>
                    <a href="login.php">
                    <li>Login</li>
                </a>
                <a href="index.php"
                    <li>Signup</li>
                </a>
                </ul>
                <?php } ?>
            </div>
            </div>
        </div>
            </html>
        


