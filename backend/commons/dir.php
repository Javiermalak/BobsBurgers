<?php
  $tail = isset($_GET['dir']) ? $_GET['dir'] : '';

  $path = $_SERVER['DOCUMENT_ROOT'].'/bb/';

  $dirs = scandir($path.$tail);

  $res = array();

  foreach ($dirs as $key => $value)
  {
    if($value != '..' && $value != '.')
    {
      $res[] = array(
        'dir' => is_dir($path.$tail.$value),
        'name' => $value
      );
    }
  }

  $res = json_encode(array('directories' => $res));
  echo $res;
?>
