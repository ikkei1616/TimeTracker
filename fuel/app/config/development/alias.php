<?php

// VSCode の intelephenseを騙してエラーが出ないようにするためのファイル

class Config extends Fuel\Core\Config {}
class Cookie extends Fuel\Core\Cookie {}
class Session extends Fuel\Core\Session {}
class Controller_Rest extends Fuel\Core\Controller_Rest {}
Class Log extends Fuel\Core\Log {}
class Auth extends Auth\Auth_Login_Simpleauth {}
class DB extends Fuel\Core\DB {}