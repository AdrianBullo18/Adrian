<?php
include 'views/header.php';
?>
<div class="container">
    <div class="banner">
        <div id="banner-propic">   
        </div>
        <div id="banner-name">
            <?= $_SESSION['firstname']." ".$_SESSION['lastname']; ?>
        </div>
    </div>
</div>
    <div class="post-container">
        <form class="post-form" action="models/add_post.php" method="POST">
            <textarea id="post-area" name="post-area" placeholder="What's on your mind"></textarea>
            <input type="submit" id="post-btn"; value="post";>
        </form>
    </div>
        <div class="account-posts">
        <?php include 'models/load_account_posts.php';
        ?>    
        </div>
   
<?php
include 'views/footer.php';