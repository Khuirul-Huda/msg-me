<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    //TODO: query db
    echo("{}"); 
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
$data = file_get_contents('php://input');
$data = json_decode($data, true);
$name = $data['name'];
$msg = $data['msg'];
//TODO: insert to db
} else {
    echo("Unsupported Method");
}

?>