<?php
include "views/header.php";
?>
        <div class="reg-form">
            <p class="title">LOGIN</p>
           <form method="POST"action="models/login_account.php">
               <?php
               if(isset($_GET['err'])){
                   echo"<p class=\"alert\"> ";
                   echo "Invalid Email or Password";
                   echo"</p>";
               }
               
               ?>
                <label for="email">Email</label>
                      <input type="email" name="email" id="email" placeholder="Bruce@gmail.com">              
                <label for="password">Password</label>
                      <input type="password" name="password" id="password">
                      <input type="submit" values="Signup"> 
            </form>
        </div> 
<?php
 include "views/footer.php";