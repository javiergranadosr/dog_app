<?php

require_once 'Connection.php';

$obj = new Connection;
$connection = $obj->connection();
$_POST = json_decode(file_get_contents("php://input"), true);
$urlOption = (isset($_POST['option'])) ? $_POST['option'] : '';


 $id = (isset($_POST['id'])) ? $_POST['id'] : '';
 $name = (isset($_POST['name'])) ? $_POST['name'] : '';
 $breed = (isset($_POST['breed'])) ? $_POST['breed'] : '';
 $gender = (isset($_POST['gender'])) ? $_POST['gender'] : '';
 $color = (isset($_POST['color'])) ? $_POST['color'] : '';
 $age = (isset($_POST['age'])) ? $_POST['age'] : '';
 
switch($urlOption){
    case 1:
      
      try {
        $query = "INSERT INTO dog (name, breed, gender, color, age) VALUES ('${name}', '${breed}', '${gender}', '${color}', ${age}) ";	
        $result = $connection->prepare($query);
        $result->execute();                
        break;
      } catch (PDOException $e) {
        echo $e->getMessage();
      }

    case 2:

       try {
        $query = "UPDATE dog SET 
          name=  '${name}',
          breed= '${breed}', 
          gender= '${gender}', 
          color = '${color}',
          age = ${age}
        WHERE id = ${id}";		
        $result = $connection->prepare($query);
        $result->execute();                         
        break; 
       } catch (PDOException $e) {
        echo $e->getMessage();
        }    

    case 3:

      try {
        $query = "DELETE FROM dog WHERE id= ${id} ";		
        $result = $connection->prepare($query);
        $result->execute();                           
        break;    
      } catch (PDOException $e) {
        echo $e->getMessage();
      }  
             
    case 4:

        try {
          $query = "SELECT * FROM dog";
          $result = $connection->prepare($query);
          $result->execute();
          $data=$result->fetchAll(PDO::FETCH_ASSOC);
          print json_encode($data, JSON_UNESCAPED_UNICODE);
          break;
        } catch (PDOException $e) {
          echo $e->getMessage();
        }  

}
$connection = NULL;