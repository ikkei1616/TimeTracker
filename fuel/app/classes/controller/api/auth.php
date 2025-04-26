<?php

class Controller_Api_Auth extends Controller_Rest
{
    // デフォルトのレスポンスはJSON
    protected $format = 'json';

    public function before()
    {  
        parent::before();
        header('Access-Control-Allow-Origin: http://localhost:5173'); 
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Content-Type');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit; // Preflightリクエストはここで終了
        }
    }


    public function action_index()
    {
        return $this->response([
            'message' => 'Hello from FuelPHP API!',
        ]);
    }

    //ログイン機能
    public function post_login()
    {
        $date = json_decode(file_get_contents("php://input"), true);
        \Log::debug('受信データ: ' . print_r(json_decode(file_get_contents("php://input"), true), true));
        // 受け取ったデータを表示（必要に応じてデバッグ）
    

        if (isset($date["name"],$date["pass"])) {
            $result =true;
            $name = $date["name"];
            $pass = $date["pass"];

            if (Auth::login($name,$pass)) {
                \Log::debug('Login Success');
                $response = array("status"=>"success","message"=>$date,"result"=>$result);
            } else {
                $response = array("status"=>"false","message"=>$date,"result"=>$result);
            }

        } else {
            $result = false;
            $response = array("status"=>"false","message"=>$date,"result"=>$result);
        }
        return $this-> response($response);
    }
    

    //POSTのテスト
    public function post_create()
    {
        $date = json_decode(file_get_contents("php://input"), true);
        \Log::debug('受信データ: ' . print_r(json_decode(file_get_contents("php://input"), true), true));
        // 受け取ったデータを表示（必要に応じてデバッグ）
        $result = "";

        if (isset($date["name"],$date["pass"],$date["email"])) {
            $result = "いけた";
        } else {
            $result = "だめ";
        }

        $name = $date["name"];
        $password = $date["pass"];
        $email = $date["email"];

        Auth::create_user($name,$password,$email,1);

    
        // レスポンスを返す
        $response = array('status' => 'success', 'message' => $date,"isError"=> $result);
        return $this->response($response);
    }
}
