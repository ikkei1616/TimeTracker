<?php

class Controller_Api_Task extends Controller_Rest
{

  use Traits_Api_Response;

  protected $format = "json";

  public function before()
  {
    parent::before();
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      exit; // Preflightリクエストはここで終了
    }
  }



  public function post_start()
  {
    $data = json_decode(file_get_contents("php://input"), true);

    Log::debug("受信データ:" . print_r(json_decode(file_get_contents("php://input"), true), true));

    if (!isset($data["title"])) {
      return $this->error("タイトルを入力してください。");
    }

    $title = $data["title"];
    $user_id = Session::get("current_user_id");
    $start_time = new DateTime();
    $start_time = $start_time->format(DateTime::ATOM);

    try {

      $response_data = array(
        "title" => $title,
        "user_id" => $user_id,
        "start_time" => $start_time,
        "end_time" => null,
      );

      DB::insert("tasks")->set(
        array(
          "title" => $title,
          "user_id" => $user_id,
          "start_time" => $start_time,
        )
      )->execute();

      return $this->success($response_data, "タスクの開始成功", 201, true);
    } catch (Exception $e) {
      Log::debug("Error", $e->getMessage());
      return $this->serverError("タスクの開始失敗");
    }
  }



  public function post_end()
  {
    $current_time = new DateTime;
    $current_time = $current_time->format(DateTime::ATOM);
    Log::debug($current_time);
    $current_user_id = Session::get("current_user_id");
    Log::debug("current_user_id" . print_r($current_user_id, true));

    try {
      DB::update("tasks")->set(["end_time" => $current_time])->where("end_time", "IS", DB::expr('NULL'))->and_where("user_id", "=", $current_user_id)->execute();
      return $this->success(null, "タスクの終了成功", 200, false);
    } catch (Exception $e) {;
      Log::debug("Error:" . print_r($e->getMessage(), true));
      return $this->serverError("タスクの終了失敗");
    }
  }

  public function get_tasks()
  {
    $current_user_id = Session::get("current_user_id");

    try {
      $tasks = DB::select("*")->from("tasks")->where("user_id", "=", $current_user_id)->execute()->as_array();

      return $this->success($tasks, "タスクの取得成功", 200, false);
    } catch (Exception $e) {
      Log::debug("Error:" . print_r($e->getMessage(), true));
      return $this->serverError("タスクの取得失敗");
    }
  }


  public function delete_tasks($task_id = null)
  {
    if (!$task_id) {
      $this->error("IDが指定されていません", 400);
    }

    try {
      $task = DB::select("*")->from("tasks")->where("id", "=", $task_id)->execute()->as_array();
      $result = DB::delete("tasks")->where("id", "=", $task_id)->execute();

      if ($result === 1) {
        return $this->success($task, "タスクの削除成功", 200, false);
      } else {
        return $this->notFoundError("該当のタスクが存在しません");
      }
    } catch (Exception $e) {
      Log::debug("Error:" . print_r($e->getMessage(), true));
      return $this->error("タスクの削除失敗");
    }
  }

  public function patch_tasks($task_id = null)
  {
    if (!$task_id) {
      return $this->error("IDが指定されていません");
    }

    $date = json_decode(file_get_contents("php://input"), true);

    #リクエストボディにtaskプロパティが含まれているか確認
    if (!isset($date["task"])) {
      return $this->validationError("リクエストが不正です");
    }

    $task = $date["task"];

    if ($task["title"] === "") {
      return $this->error("タスクの名前を入力してください", 400);
    }

    $title = $task["title"];

    try {
      $current_task_array = DB::select("*")->from("tasks")->where("id","=",$task_id)->execute()->as_array();
      $current_task = $current_task_array[0];
      $current_task_title = $current_task["title"];

      if ($title === $current_task_title) {
        return $this->error("タスク名を変更して下さい");
      }
    } catch(Exception $e) {
      Log::debug("Error:".print_r($e->getMessage(),true));
    }

    try {
      Log::debug("task_id:{$task_id}");
      $result = DB::update("tasks")->set(["title"=>$title,])->where("id", "=", $task_id)->execute();
      
      if ($result === 0) {
        return $this->notFoundError("該当するタスクが存在しません");
      }

      $edited_task  = DB::select("*")->from("tasks")->where("id","=",$task_id)->execute()->as_array();
      return $this->success($edited_task, "タスクを更新しました", 200, true);

    } catch (Exception $e) {
      Log::debug("Error:" . print_r($e->getMessage(), true));
      return $this->serverError("タスクの編集失敗");
    }
  }

  public function get_current_task()
  {
    try {
      $current_user_id = Session::get("current_user_id");
      $current_task = DB::select("*")->from("tasks")->where("user_id","=",$current_user_id)->and_where("end_time", "IS", DB::expr('NULL'))->execute()->as_array();

      if ($current_task == []) {
        return $this->serverError("進行中のタスクがありませんでした。");
      }

      return $this->success($current_task,"進行中のタスクの取得成功",200,true);
    } catch (Exception $e) {
      Log::debug("Error".print_r($e->getMessage()));
      return $this->serverError("進行中のタスクを取得することができませんでした");
    }
  }
}
