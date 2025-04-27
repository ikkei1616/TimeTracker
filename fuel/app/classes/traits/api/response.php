<?php

trait Traits_Api_Response
{
  /**
   * 成功レスポンスを返す
   * 
   * @param array|mixed $data レスポンスに追加するデータ
   * @param string $message 成功メッセージ
   * @param int $code HTTPステータスコード
   * @param bool $sendServerTime サーバー時間をレスポンスに含めるかどうか
   * @return Response
   */
  protected function success($data = null, $message = 'Success', $code = 200, $sendServerTime = true)
  {
    // サーバー時間をレスポンスに含める場合
    if ($sendServerTime) {
      $response['server_time'] = time();
    }

    // レスポンスの基本情報
    {
      $response = [
        'status' => 'success',
        'message' => $message,
      ];

      // データが配列の場合はレスポンスにマージ
      if (is_array($data)) {
        $response = array_merge($response, $data);
      } elseif ($data !== null) {
        // 配列でない場合は 'data' キーに格納
        $response['data'] = $data;
      }

      return $this->response($response, $code);
    }
  }

  /**
   * エラーレスポンスを返す
   * 
   * @param string $errorMessage エラーメッセージ
   * @param int $code HTTPステータスコード
   * @return Response
   */
  protected function error($errorMessage = 'Error', $code = 400)
  {
    $response = [
      'status' => 'error',
      'error' => $errorMessage,
      'server_time' => time()
    ];

    return $this->response($response, $code);
  }

  ////////////////////////////////////////////////////////

  /**
   * バリデーションエラーレスポンスを返す
   * 
   * @param string $message エラーメッセージ
   * @return Response
   */
  protected function validationError($message = 'Validation failed')
  {
    return $this->error($message, 422);
  }

  /**
   * 認証エラーレスポンスを返す
   * 
   * @param string $message エラーメッセージ
   * @return Response
   */
  protected function unauthorizedError($message = 'Unauthorized')
  {
    return $this->error($message, 401);
  }

  /**
   * 権限エラーレスポンスを返す
   * 
   * @param string $message エラーメッセージ
   * @return Response
   */
  protected function forbiddenError($message = 'Forbidden')
  {
    return $this->error($message, 403);
  }

  /**
   * リソース未検出レスポンスを返す
   * 
   * @param string $message エラーメッセージ
   * @return Response
   */
  protected function notFoundError($message = 'Resource not found')
  {
    return $this->error($message, 404);
  }

  /**
   * サーバーエラーレスポンスを返す
   * 
   * @param string $message エラーメッセージ
   * @param mixed $errors 詳細エラー情報
   * @return Response
   */
  protected function serverError($message = 'Server error')
  {
    return $this->error($message, 500);
  }
}
