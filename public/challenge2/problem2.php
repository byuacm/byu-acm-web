<?php
$answer1 = '389';
$answer1a = '389';

$answer2 = '153765';
$answer2a = '152577';

$answer3 = '1846216';
$answer3a = '1831663';

$answer4 = '367170';
$answer4a = '364368';
$enter = false;
$right = 0;
if (isset($_POST['answer1'])) {
    if ($_POST['answer1'] == $answer1) {
        $right++;
    } 
    if (($_POST['answer3'] == $answer3 && $_POST['answer2'] == $answer2) || ($_POST['answer3'] == $answer3a && $_POST['answer2'] == $answer2a))
      $right++;
    if ($_POST['answer4'] == $answer4 || $_POST['answer4'] == $answer4a)
      $right++;
    if($right > 0)
      $enter = true;
    else if ($_POST['answer3'] == $answer3 || $_POST['answer2'] == $answer2)
      $enter = true;
    else
      die('Wrong Answers <br> <a href="."> Try again.</a>');
} 

if (!$enter): ?>

<html>
<head>
  <title>Challenge Problem 2</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
  <body>
    <div class='container'>
      <form method="post" id="signup">
        <div class="header">
           <h3>Challenge Problem 2:</h3>
        </div>
      <p><b>If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.</b></p>

       <p style='color:#660000; font-weight:bold;'>1 point</p>
      <p>If all the numbers from 1 to 50 (fifty) inclusive were written out in words, how many letters would be used?</p>
      <div class="inputs">
        <input type="info" name="answer1" placeholder="Answer 1"> <br />
      </div>
       <p style='color:#660000; font-weight:bold;'>1 point for #2 and #3</p>
      <p>If all the numbers from 1 to 5,000 (five thousand) inclusive were written out in words, how many letters would be used?</p>
      <div class="inputs">
        <input type="info" name="answer2" placeholder="Answer 2"> <br />
	</div>
      <p>If all the numbers from 1 to 50,000 (fifty thousand) inclusive were written out in words, how many letters would be used?</p>
      <div class="inputs">
        <input type="info" name="answer3" placeholder="Answer 3"> <br />
      </div>
       <p style='color:#660000; font-weight:bold;'>1 point</p>
      <p>If all the primes from 1 to 100,000 (one hundred thousand) were written out in words, how many letters would be used?</p>
      <div class="inputs">
        <input type="info" name="answer4" placeholder="Answer 4"> <br />
      </div>
      <p><b>NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.</b></p>

        <div class="inputs">
          <input type="submit" name="submit" value="Submit" id="submit">
        </div>
      </form>
    </div>
  </body>
</html>

<?php
exit();
endif;
$enter = false;
?>
