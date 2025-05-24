<?php

use Fuel\Core\DB;


class Model_Task extends \Model
{
  public static function start_task($title,$user_id)
  {
    $start_time = new DateTime("now",new DateTimeZone("UTC"));
    $start_time_string = $start_time->format(DateTime::ATOM);

    try {
      DB::insert("tasks")->set(
        array(
          "title" => $title,
          "user_id"=> $user_id,
          //質問 ここなんでstringに書き換えるの？
          "start_time"=>$start_time_string
        )
      )->execute();

      return array(
        "title"=>$title,
        "user_id"=>$user_id,
        "start_time"=>$start_time_string,
        "end_time"=>null,
      );

    } catch (Exception $e) {
      Log::error("タスクの開始に失敗しました :",$e->getMessage());
      throw $e;
    }
  }


}