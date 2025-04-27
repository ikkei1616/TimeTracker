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
}
