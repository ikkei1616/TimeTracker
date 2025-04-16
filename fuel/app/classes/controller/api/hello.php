<?php

class Controller_Api_Hello extends Controller_Rest
{
    // デフォルトのレスポンスはJSON
    protected $format = 'json';

    public function before()
{
    parent::before();
    header('Access-Control-Allow-Origin: *'); // 本番では * は避けよう！
}

    public function get_index()
    {
        return $this->response([
            'message' => 'Hello from FuelPHP API!',
        ]);
    }
}
