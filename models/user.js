var express = require('express');
var http = require('http');
var arrayList = require('array-list');
//var BDD = require('../config/BDD');
var bodyParser = require('body-parser');
var mysql = require('mysql');

//var callback = function(err, result) { return result };

var con = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
	user: 'root',
	password : '',
    database: 'aos'
});


exports.userCo = function(login,mdp,callback){

        
    con.query("SELECT * FROM personne WHERE login='"+login+"' AND mdp='"+mdp+"'", function(err, result){
        if(err){
            throw err;
        }else if(result == undefined){
            console.log("je suis dans le else if de user")
           callback(null,null,result);
        }
        else{
            console.log("je suis dans le else de user");
           
            var string_data = JSON.stringify(result);
            
            var resultat = JSON.parse(string_data); 
         
            callback(null, null,resultat);
        }
    }
  );
}


exports.listAmis = function(id_userco,callback){
  
    con.query("SELECT id_follower FROM follower WHERE id_personne='"+id_userco+"'", function(err, result){
        let list = [];
        if(err){
            throw err;
        }else if(result == undefined){
            
           callback(null,result);
        }
        else{
            var string_data = JSON.stringify(result);
            var resultat = JSON.parse(string_data); 
            for(var i=0 ; i < resultat.length; i++){
                var follower = resultat[i];
                con.query("SELECT * FROM personne WHERE id_personne='"+follower.id_follower+"'", function(err, result){
                    if(err){
                        throw err;
                    }else if(result == undefined){
                        console.log("je suis dans le else if de user")
                       callback(null,result);
                    }
                    else{
                        console.log("je suis dans le else de list");
                      
                        var string_data = JSON.stringify(result);
                        var res = JSON.parse(string_data);
                        list.push(res[0]);
                    } 
                        console.log(list.length);
                    if(list.length >= resultat.length){
                        console.log(list);
                        callback(null,list);
                    }
                });
            }   
        } 
    });
}

exports.getUser= function(id_user, callback){
        id = parseInt(id_user, 10);
        
        con.query("SELECT * FROM personne WHERE id_personne='"+id+"'", function(err, result){
            if(err){
                throw err;
            }else if(result == undefined){
                console.log("je suis dans le else if de user")
               callback(null,result);
            }
            else{
                console.log("je suis dans le else de user");
               
                var string_data = JSON.stringify(result);
                
                var resultat = JSON.parse(string_data); 
                console.log(resultat);
                callback(null,resultat);
            }
        }
      );
    }
    
    exports.getAllUser= function(id_user, callback){
        id = parseInt(id_user, 10);
        con.query("SELECT id_follower FROM follower WHERE id_personne='"+id+"'", function(err, result){
            let list = [];
            if(err){
                throw err;
            }else if(result == undefined){
                
               callback(null,result);
            }
            else{
                var string_data = JSON.stringify(result);
                var resultat = JSON.parse(string_data); 
                
                var chaine="";
                for(var i=0 ; i<resultat.length; i++){

                    chaine += "AND id_personne !='"+ resultat[i].id_follower+"' " ;
                    chaine = chaine.substring(0,chaine.length-1);
                }
                
        con.query("SELECT * FROM personne WHERE id_personne !='"+id+"'"+chaine+"", function(err, result){
            if(err){
                throw err;
            }else if(result == undefined){
                
               callback(null,result);
            }
            else{
                var string_data = JSON.stringify(result);
                
                var resultat = JSON.parse(string_data); 
             
                callback(null,resultat);
            }
        }
      );
    }

    });
    }




exports.infoAmis = function(callback){


var user = {"id": 1,
            "nom" : "hanine",
            "prenom": "othmane",        
            "adresse" : "70 rue riquet 75017",
            "telephone" : "0663734496"
            };

            callback(user);

}

