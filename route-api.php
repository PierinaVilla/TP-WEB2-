<?php

require_once 'libs/Router.php';
require_once 'Controller/ApiComentariosController.php';

// crea el router
$router = new Router();

// define la tabla de ruteo  //recurso //metodo // el controlador // nombre metodo
$router->addRoute('comentarios', 'POST', 'ApiComentarioController','addComments');
$router->addRoute('comentarios/:ID', 'DELETE', 'ApiComentarioController','deleteComment');

$router->addRoute('comentarios/materia/:ID', 'GET', 'ApiComentarioController','viewCommentsBySubjects');
//filtro por puntos
$router->addRoute('comentarios/puntaje/:puntaje', 'GET', 'ApiComentarioController', 'filterCommentsByScore');
//ordenar comentarios por antiguedad
$router->addRoute('comentarios/materia/:ID/antiguedad', 'GET', 'ApiComentarioController', 'sortCommentsByAge');

//rutea
$router->route($_GET["resource"], $_SERVER['REQUEST_METHOD']);

