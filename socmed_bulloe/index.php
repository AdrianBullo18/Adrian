<?php
include "views/header.php";
?>
        <div class="reg-form">
             <p class="title">REGISTRATION</p>
           <form method="POST" action="models/register_account.php" method="POST">
                <label for="email">Email</label>
                      <input type="email" name="email" id="email" placeholder="Bruce@gmail.com">
                <label for="firstname">First name</label>
                      <input type="text" name="firstname" id="firstname" placeholder="Bruce">
                <label for="lastname">Last name</label>
                      <input type="text" name="lastname" id="lastname" placeholder="Wayne">
                <label for="password">Password</label>
                      <input type="password" name="password" id="password">
                <label for="cpassword">Confirm Password</label>
                      <input type="cpassword" name="cpassword" id="cpassword">
                      <input type="submit" values="Signup"> 
            </form>
        </div> 
<?php
 include "views/footer.php";