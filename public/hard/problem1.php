<?php
$password = '5777';

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
  <title>Challenge Problem - Hard</title>
  <link rel="stylesheet" href="style.css">
</head>
  <body>
    <div class='container'>
      <form method="post" id="signup">
        <div class="header">
          <h3>Challenge Problem (2pts):</h3>
        </div>
<p>It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.</p>
<p style='margin-left:10px;'>9 = 7 + 2*1<sup>2</sup><br>
15 = 7 + 2*2<sup>2</sup><br>
21 = 3 + 2*3<sup>2</sup><br>
25 = 7 + 2*3<sup>2</sup><br>
27 = 19 + 2*2<sup>2</sup><br>
33 = 31 + 2*1<sup>2</sup></p>
<p>It turns out that the conjecture was false.</p>
<p>What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?</p>
        <div class="inputs">
          <input type="info" name="answer" placeholder="Answer"> <br>
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
