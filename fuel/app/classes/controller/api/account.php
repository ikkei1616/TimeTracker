<?php
use Fuel\Core\Security;

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
        header('Access-Control-Allow-Headers: Content-Type,X-CSRF-Token');
        header('Access-Control-Allow-Credentials: true');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
           exit; // Preflightリクエストはここで終了
        }
    }

    //ログイン機能
    public function post_login()
    {
        $token = Input::headers("X-CSRF-Token");
        if (!Security::check_token($token)) {
            return $this->forbiddenError($message="トークンが不正です。");
        }

        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["name"],$data["pass"])) {
            return $this ->error("フォームの入力が不正です。");
        }

        $name = $data["name"];
        $pass = $data["pass"];

        if (Auth::login($name,$pass)) {            
            $current_user_id_array = Auth::get_user_id($name,$pass);
            if (!isset($current_user_id_array[1])){
                throw new Exception("アカウントが存在しないのにログイン完了");
            }
            $user_id = $current_user_id_array[1];
            Session::rotate();
            Session::set("current_user_id",$user_id);
            return $this-> success(null,"ログインに成功しました",200);
        } else {
            return $this->error("ログインに失敗しました。");
        }
    }


    //POSTのテスト
    public function post_create()
    {
        
        $data = json_decode(file_get_contents("php://input"), true);

        //リクエストデータが正しいか確認
        if (!isset($data["name"], $data["pass"], $data["email"])) {
            return $this->error("リクエストが不正です");
        }

        $name = $data["name"];
        $password = $data["pass"];
        $email = $data["email"];

        //名前の形式が正しいか
        if (strlen($name) < 1 ) {
            return $this->validationError("ユーザーネームを入力してください");
        }
        
        //emailの形式が正しいか確認
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->validationError("メールアドレスの形式が不正です");
        }

        //既存ユーザーかどうか確認
        $is_exists_user = Model_Account::exists_by_email($email);
            
        if ($is_exists_user) {
            return $this->error("このメールアドレスは既に使用されています", 409);
        }

        try {
            Auth::create_user($name, $password, $email, 1);
            $is_login = Auth::login($name,$password);
            $id__array = Auth::get_user_id();
            $current_user_id = $id__array[1];
            Session::set("current_user_id",$current_user_id);
            Session::set("is_signed_in",true);
            return $this->success(null, "アカウント作成成功", 201, false);
        } catch (Exception $e) {
            // エラーハンドリング
            Log::debug('Error: ' . $e->getMessage());
            return $this->serverError("アカウント作成失敗");
        }
    }

    public function action_checkSignIn()
    {
        $is_signed_in = Session::get('is_signed_in');
        $response = array("is_signed_in" => $is_signed_in);
        return $this->response($response);
    }
}
