<?php

function connexionPDO()
{
    $login = "gaka6602_keycraft";
    $mdp = "PBqvgr2o0";
    $bd = "gaka6602_keycraft";
    $serveur = "engoulevent.o2switch.net:3306";

    try {
        $conn = new PDO("mysql:host=$serveur;dbname=$bd", $login, $mdp);
        echo "Connexion réussie";
        return $conn;
    } catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
        die();
    }
}

connexionPDO();
