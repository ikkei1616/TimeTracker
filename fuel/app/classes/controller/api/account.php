<?php

class Controller_Api_Account extends Controller_Rest
{

    use Traits_Api_Response;

    // デフォルトのレスポンスはJSON
    protected $format = 'json';

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
        Log::debug('受信データ: ' . print_r(json_decode(file_get_contents("php://input"), true), true));
        // 受け取ったデータを表示（必要に応じてデバッグ）




        if (isset($date["name"], $date["pass"])) {
            $result = true;
            $name = $date["name"];
            $pass = $date["pass"];

            if (Auth::login($name, $pass)) {
                Log::debug('Login Success');
                $response = array("status" => "success", "message" => $date, "result" => $result);
                Session::set('is_signed_in', true);
                Log::debug(Session::get('is_signed_in'));
            } else {
                $response = array("status" => "false", "message" => $date, "result" => $result);
            }
        } else {
            $result = false;
            $response = array("status" => "false", "message" => $date, "result" => $result);
        }
        return $this->response($response);
    }


    //POSTのテスト
    public function post_create()
    {
        $date = json_decode(file_get_contents("php://input"), true);
        Log::debug('受信データ: ' . print_r(json_decode(file_get_contents("php://input"), true), true));
        // 受け取ったデータを表示（必要に応じてデバッグ）
        $result = "";

        if (!isset($date["name"], $date["pass"], $date["email"])) {
            return $this->error("リクエストが不正です", 400);
        }

        $name = $date["name"];
        $password = $date["pass"];
        $email = $date["email"];


        $existUsers = DB::select("email")
            ->from("users")
            ->where("email", "=", $email)
            ->execute()
            ->as_array();

        if (count($existUsers) > 0) {
            return$this->error("このメールアドレスは既に使用されています", 409);
        }

        try {
            Auth::create_user($name, $password, $email, 1);
            return $this->success(null, "アカウント作成成功", 201, false);
        } catch (Exception $e) {
            // エラーハンドリング
            Log::debug('Error: ' . $e->getMessage());
            return $this->error("アカウント作成失敗", null, 500);
        }
    }

    public function action_checkSignIn()
    {
        $is_signed_in = Session::get('is_signed_in');
        $response = array("result" => $is_signed_in);
        return $this->response($response);
    }
}
