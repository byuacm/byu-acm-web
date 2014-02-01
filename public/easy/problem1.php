<?php
$password = '443839';

if (!isset($_SESSION['loggedIn'])) {
    $_SESSION['loggedIn'] = false;
}

if (isset($_POST['answer'])) {
    if ($_POST['answer'] == $password) {
        $_SESSION['loggedIn'] = true;
    } else {
        die ('Wrong answer');
    }
} 

if (!$_SESSION['loggedIn']): ?>

<html>
<head>
  <title>Challenge Problem - Easy</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
  <body>
    <div class='container'>
      <form method="post" id="signup">
        <div class="header">
          <h3>Challenge Problem (1 pt)</h3>
        </div>
<p>Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:</p>
<blockquote>1634 = 1<sup>4</sup> + 6<sup>4</sup> + 3<sup>4</sup> + 4<sup>4</sup><br />
8208 = 8<sup>4</sup> + 2<sup>4</sup> + 0<sup>4</sup> + 8<sup>4</sup><br />
9474 = 9<sup>4</sup> + 4<sup>4</sup> + 7<sup>4</sup> + 4<sup>4</sup></blockquote>
<p class='info'>As 1 = 1<sup>4</sup> is not a sum it is not included.</p>
<p>The sum of these numbers is 1634 + 8208 + 9474 = 19316.</p>
<p>Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.</p>
        <div class="inputs">
          <input type="info" name="answer" placeholder="Answer"> <br />
          <input type="submit" name="submit" value="Submit" id="submit">
        </div>
      </form>
    </div>
  </body>
</html>

<?php
exit();
endif;
$_SESSION['loggedIn'] = false;
?>
