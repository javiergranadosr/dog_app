<?php

class Connection{

  private $driver ="mysql";
  private $host ="localhost";
  private $user ="root";
  private $password ="admin";
  private $dbname = "dog_app";
  private $charset = "utf8";

  public function connection(){
    try {
      
      $pdo = new PDO("{$this->driver}:host={$this->host};dbname={$this->dbname};charset ={$this->charset}",
      $this->user,$this->password);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $pdo;
      
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }

}
