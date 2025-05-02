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
    $current_user_id = 5;
    // $current_user_id = Session::get("current_user_id");
    Log::debug("current_user_id",$current_user_id);

    try {
      DB::update("tasks")->set(["end_time" => $current_time])->where("end_time", "IS", DB::expr('NULL'))->and_where("user_id","=",$current_user_id)->execute();
      return $this->success(null, "Success", 200, false);
    } catch (Exception $e) {;
      Log::debug("Error:", $e->getMessage());
      return $this->error("タスクの終了失敗");
    }
  }
}
