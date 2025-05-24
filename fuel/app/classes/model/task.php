<?php

use Fuel\Core\DB;


class Model_Task extends \Model
{

  public static function start_task($title, $user_id)
  {
    $start_time = new DateTime("now", new DateTimeZone("UTC"));
    $start_time_string = $start_time->format(DateTime::ATOM);

    try {
      DB::insert("tasks")->set(
        array(
          "title" => $title,
          "user_id" => $user_id,
          "start_time" => $start_time_string
        )
      )->execute();

      return array(
        "title" => $title,
        "user_id" => $user_id,
        "start_time" => $start_time_string,
        "end_time" => null,
      );
    } catch (Exception $e) {
      Log::error("タスクの開始に失敗しました :", $e->getMessage());
      throw $e;
    }
  }

  public static function end_task($current_user_id)
  {
    $current_time = new DateTime("now", new DateTimeZone("UTC"));
    $current_time_string = $current_time->format(DateTime::ATOM);

    try {
      $number_of_update = DB::update("tasks")
        ->set(["end_time" => $current_time_string])
        ->where("end_time", "IS", DB::expr("NULL"))
        ->and_where("user_id", "=", $current_user_id)
        ->execute();
      return $number_of_update;
    } catch (Exception $e) {
      Log::debug("タスクの終了失敗:", $e->getMessage());
      throw $e;
    }
  }

  public static function get_tasks($current_user_id)
  {
    try {
      $tasks_array = DB::select("*")
        ->from("tasks")
        ->where("user_id", "=", $current_user_id)
        ->execute()
        ->as_array();
      return $tasks_array;
    } catch (Exception $e) {
      Log::error("タスクの取得に失敗しました:", $e->getMessage());
      throw $e;
    }
  }

  public static function get_task_by_id($task_id)
  {
    try {
      $task = DB::select("*")
        ->from("tasks")
        ->where("id", "=", $task_id)
        ->execute()
        ->as_array();
      return  $task;
    } catch (Exception $e) {
      Log::error("タスクが取得できませんでした");
      throw $e;
    }
  }

  public static function delete_tasks($task_id)
  {
    try {

      $number_of_deleted_task = DB::delete("tasks")
        ->where("id", "=", $task_id)
        ->execute();

      return $number_of_deleted_task;
    } catch (Exception $e) {
      Log::debug("タスク削除失敗:", $e->getMessage());
      throw $e;
    }
  }

  public static function patch_tasks($new_title, $task_id)
  {
    try {
      $number_edited_task = DB::update("tasks")
        ->set(["title" => $new_title])
        ->where("id", "=", $task_id)
        ->execute();
      return $number_edited_task;
    } catch (Exception $e) {
      Log::error("タスクの修正失敗", $e->getMessage());
      throw $e;
    }
  }

  public static function get_current_task($current_user_id)
  {
    try {
      $current_task = DB::select("*")
        ->from("tasks")
        ->where("user_id", "=", $current_user_id)
        ->and_where("end_time", "IS", DB::expr("NUll"))
        ->execute()
        ->as_array();
      Log::debug("current_task" . print_r($current_task, true));
      return $current_task;
    } catch (Exception $e) {
      Log::error("現在のタスク取得失敗:", $e->getMessage());
      throw $e;
    }
  }
}
