<?php

use Fuel\Core\Auth;


class Model_Account extends \Model
{
  public static function exists_by_email(string $email) 
  {
    $email_array = DB::select("email")
      ->from("users")
      ->where("email","=",$email)
      ->execute()
      ->as_array();
    $is_exists_user = count($email_array) > 0;
    
    return $is_exists_user;
  }

}