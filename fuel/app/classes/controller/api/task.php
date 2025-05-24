<?php

use Fuel\Core\Debug;

class Controller_Api_Task extends Controller_Rest
{
  use Traits_Api_Response;

  protected $format = "json";

  public function before()
  {
    parent::before();
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE,PATCH,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type,X-CSRF-Token');
    header('Access-Control-Allow-Credentials: true');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      exit; // Preflightリクエストはここで終了
    }
  }


  private function convertToUtc(string $datetime): string
  {
    return (new DateTime($datetime, new DateTimeZone("UTC")))->format(DateTime::ATOM);
  } 

  private function formatTaskWithUtc(array $task): array
  {
    $has_end_time = $task["end_time"] !== null;

    $task["start_time"] = $this->convertToUtc($task["start_time"]);
    $task["end_time"] =  $has_end_time ? $this->convertToUtc($task["end_time"]) : null;

    return $task;
  }

  public function post_start()
  {
    // csrf対策 トークンの確認
    $token = Input::headers("X-CSRF-Token");
    if (!Security::check_token($token)) {
      return  $this->forbiddenError("CSRFトークンが不正です");
    }

    //リクエストbodyを連想配列として取得
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["title"])) {
      return $this->error("タイトルを入力してください。");
    }

    $title = $data["title"];
    $user_id = Session::get("current_user_id");

    //タスク情報($title,$user_id,$start_time)をDBに保存、レスポンスを整形
    try {
      $response_data = Model_Task::start_task($title,$user_id);
      return $this->success($response_data, "タスクの開始成功", 201, true);
    } catch (Exception $e) {
      Log::error("API start_task error:", $e->getMessage());
      return $this->serverError("タスクの開始失敗");
    }
  }


  public function post_end()
  {
    //csrfトークンが一致しているかどうかを検査
    $token = Input::headers("X-CSRF-Token");
    if (!Security::check_token($token)) {
      return $this-> response(["error"=>"Invalid"]);
    }
    //現在ログインしているユーザーのidを取得
    $current_user_id = Session::get("current_user_id");
    
    //DBのtaskレコードをupdate
    try {
      $number_of_update_result = Model_Task::end_task($current_user_id);
      if ($number_of_update_result === 0) {
        return $this->serverError("終了すべきタスクが存在しません");
      }
      return $this->success(null,"タスクの終了成功",200,true);
    } catch (Exception $e) {
      Log::error("API end_task error:", $e->getMessage());
      return $this->serverError("タスクの終了失敗");
    }

  }

  public function get_tasks()
  {
    $token = Input::headers("X-CSRF-Token");
    if (!Security::check_token($token)) {
      $this->forbiddenError("Invalid CSRF token");
    }

    // 現在ログインしているユーザーのid取得
    $current_user_id = Session::get("current_user_id");

    try {
      $tasks = Model_Task::get_tasks($current_user_id);

      $tasks = array_map([$this,"formatTaskWithUtc"],$tasks);

      return $this->success($tasks,"タスクの取得成功",200,false);
    } catch (Exception $e) {
      Log::error($e);
      return $this->serverError("タスクの取得失敗");
    }
  }


  public function delete_tasks($task_id = null)
  {

    $token = Input::headers("X-CSRF-Token");
    if (!Security::check_token($token)) {
      return $this->forbiddenError("トークンが不正です");
    }

    try {
      $deleted_task = Model_task::get_task_by_id(($task_id));
      $number_of_deleted_task = Model_Task::delete_tasks($task_id);
    
      if ($number_of_deleted_task === 0) {
        $this->serverError("該当のタスクが存在しません");
      }
      return $this->success($deleted_task,"タスクの削除成功",200,true);
    } catch (Exception $e) {
      Log::error("Error:",$e->getMessage());
      return $this->serverError("タスクの削除失敗");
    }
    
  }


  public function patch_tasks($task_id = null)
  {
    $token = Input::headers("X-CSRF-Token");
    if (!Security::check_token($token)) {
      return $this->forbiddenError("トークンが不正です");
    }

    if (!$task_id) {
      return $this->error("IDが指定されていません");
    }

    $data = json_decode(file_get_contents("php://input"),true);

    if (!isset($data["task"])) {
      return $this->validationError("リクエストが不正です");
    }
    
    $new_task = $data["task"];

    if ($new_task["title"] === "") {
      return $this -> error("タスク名を入力してください");
    }

    $new_title = $new_task["title"];

    try {
      $current_task_array = Model_Task::get_task_by_id($task_id);
      $current_task = $current_task_array[0];
      $current_task_title = $current_task["title"];

      if ($current_task_title === $new_title) {
        return $this->error("タスク名を編集してください");
      }
    } catch (Exception $e){
      Log::error("タスクの取得失敗",$e->getMessage());
      return $this->serverError("タスクの取得失敗");
    }

    try {
      $number_edited_task = Model_Task::patch_tasks($new_title,$task_id);
      if ($number_edited_task === 0 ) {
        return $this->notFoundError("該当するタスクが存在しません");
      }
      $edited_task = Model_Task::get_task_by_id($task_id);
      return $this->success($edited_task,"タスク編集成功",200,true);

    } catch (Exception $e) {
      Log::error("タスクの編集失敗:",$e->getMessage());
      return $this->serverError("タスクの編集失敗");
    }
  }



  public function get_current_task()
  {
    $token = Input::headers("X-CSRF-Token");
    if (!Security::check_token($token)) {
      return $this->response(["error"=>"Invalid CSRF token"],403);
    }

    try {
      $current_user_id = Session::get("current_user_id");
      $current_task = Model_Task::get_current_task($current_user_id);
      $current_task = array_map([$this,"formatTaskWithUtc"],$current_task);

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
