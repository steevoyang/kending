if($_GET['action'] == 'signup'){  
    mysql_connect('localhost','YOUR DB USERNAME','YOUR DB PASSWORD');    
    mysql_select_db('YOUR DATABASE THAT CONTAINS THE SIGNUPS TABLE');  
    $email = mysql_real_escape_string($_POST['signup-email']);  
  
    //do some stuff  
  
    exit;  
}