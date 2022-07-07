<?php
date_default_timezone_set('Asia/Jakarta');

    $db = new SQLite3('./database-main.db');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $content = $db->query('SELECT * FROM main ORDER BY id DESC');
    $res = array();
    while ($tmp = $content->fetchArray(SQLITE3_ASSOC)) {
        $res[] = $tmp;
    }
     echo(json_encode($res));
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {

$data = file_get_contents('php://input');
$data = json_decode($data, true);
$nameVal = $data['name'];
$msgVal = $data['msg'];
if (!preg_match("/^[A-Za-z0-9_., ?]+$/", base64_decode($nameVal)) || !preg_match("/^[A-Za-z0-9_., ?]+$/", base64_decode($msgVal))) 
   die("Invalid Characters");
$timeVal = base64_encode(date('d') . " " . date("F", mktime(0, 0, 0, date('m'), 10)) . " " . date('Y') . " " . date('H:i'));
//TODO: USE PREPARE()
$dbInput = $db->exec("INSERT INTO main(name, msg, time) VALUES ('$nameVal', '$msgVal', '$timeVal')");


} else {
    echo("Unsupported Method");
}


?>
