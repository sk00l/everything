<?php


$csrf_token = "my-csrf-token-123";
$query = $_GET['q'];


echo "<div>";
echo "<p>This is the second paragraph, appended to the div.</p>";
echo "</div>";

echo "<style>" .$query."</style>";

echo "<div>";
echo '<input class="login-btn" csrf_token="'.$csrf_token.'">Login</input>';
echo "</div>";


?>
