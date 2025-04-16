<?php

class Controller_Api_Hello extends Controller_Rest
{
    // デフォルトのレスポンスはJSON
    protected $format = 'json';

    public function before()
    {  
        parent::before();
        header('Access-Control-Allow-Origin: http://localhost:5173'); 
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Content-Type');
    }

    public function get_index()
    {
        return $this->response([
            'message' => 'Hello from FuelPHP API!',
        ]);
    }
}
