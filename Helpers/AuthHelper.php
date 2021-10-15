<?php
class AuthHelper
{

    public function __construct()
    {
    }
    
    public function checkSession()
    {
        session_start();
        
        if (  $this->checkIsAdmin()=="true"  ) {  //true
            session_abort();
            header("Location: ".BASE_URL."carreras");
        }
       
    }


    public function checkLoggedIn()
    {
        
        $respuesta = "false";
        session_start();
        if (!empty($_SESSION['email'])) {
            if (isset($_SESSION['email'])) {
                $respuesta = "true";
            } else {
                $respuesta = "false";
            }
        }
        session_abort();
        return $respuesta;
    }
 

    public function checkIsAdmin()
    {
        session_abort();
        $respuesta = "false";
        session_start();
        if (!empty($_SESSION['rol'])) {
            if ($_SESSION['rol'] == "admin" ) {
                $respuesta = "true";
            } else {
                $respuesta = "false";
            }
        }
       session_abort();
        return $respuesta;
    }
    // public function getRol()
    // {
    //     session_start();
    //     if (isset($_SESSION['rol'])) {
    //         $rol = $_SESSION['rol'];
    //      } else{
    //         $rol =  null;
    //     session_abort();
    //     return $rol;
    //      }
    //     }

}