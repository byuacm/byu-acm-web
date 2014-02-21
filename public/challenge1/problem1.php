<?php
$password = '5343342001';

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
  <title>Challenge Problem 1</title>
  <link rel="stylesheet" href="style.css">
</head>
  <body>
    <div class='container'>
      <form method="post" id="signup">
        <div class="header">
          <h3>Challenge Problem 1:</h3>
        </div>
      <p>Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:</p>
<p style="text-align:center;font-family:courier new;"><span style="color:#ff0000;font-family:courier new;"><b>21</b></span> 22 23 24 <span style="color:#ff0000;font-family:courier new;"><b>25</b></span><br>
20 &nbsp;<span style="color:#ff0000;font-family:courier new;"><b>7</b></span> &nbsp;8 &nbsp;<span style="color:#ff0000;font-family:courier new;"><b>9</b></span> 10<br>
19 &nbsp;6 &nbsp;<span style="color:#ff0000;font-family:courier new;"><b>1</b></span> &nbsp;2 11<br>
18 &nbsp;<span style="color:#ff0000;font-family:courier new;"><b>5</b></span> &nbsp;4 &nbsp;<span style="color:#ff0000;font-family:courier new;"><b>3</b></span> 12<br>
<span style="color:#ff0000;font-family:courier new;"><b>17</b></span> 16 15 14 <span style="color:#ff0000;font-family:courier new;"><b>13</b></span></p>
<p>It can be verified that the sum of the numbers on the diagonals is 101.</p>

<p>What is the sum of the numbers on the diagonals in a 2001 by 2001 spiral formed in the same way?</p>
        <div class="header">
          <h3>Answer:</h3>
        </div>
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
