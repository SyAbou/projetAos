var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var BDD = require('./config/BDD');
var utilisateur = require('./models/user');
var url = require('url');
var multer=require('multer');
var ejs = require('ejs');
var mysql = require('mysql');
const util = require('util');
const path = require('path');
//--------------- conn aminata -------------------------------------------------------------------------------
var application = express();
var Photo = require('./models/insertion');


var con = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
	user: 'root',
	password : '',
    database: 'aos'
});
application.set('view engine', 'ejs');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './ressources/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

 // Init Upload
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myImage');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Seules les images sont autorisées!');
    }
  }

application.use(express.static('./ressources'));

application.get('/profil', (req, res) => {
    //var user_connecter = req.body.id || req.query.id || req.headers['x-access-id'];
    con.query("SELECT * FROM photo", function(err, result){
    if(err) {
        res.send(500,"connexion impossible à la base de données");
        throw err;
            
    }
    res.render('pages/profil', {
      msg: '',
      images: result//`uploads/${req.file.filename}`
    });
  })
});




application.post('/upload', (req, res) => {
   upload(req, res, (err) => {
        console.log("le premier console de upload "+ req.file);
     if(err){
        res.render('profil', {
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.render('pages/profil', {
            msg: 'Error: Aucune image séléctionné!'
          });
        } else {
          console.log("bonjour");
          con.query("SELECT * FROM photo", function(err, result){
            if(err) throw err;
            res.render('pages/profil', {
              msg: 'Image publié!',
              images: result//`uploads/${req.file.filename}`
            });
          })

          var image = "uploads/"+req.file.filename;
          var title = "test"; 
          var description= "test";
          var visibilite= "1";
          var user_connecter = 1 // il faut envoyer le user avec la requette pour pouvoir le recuperer req.body.id || req.query.id || req.headers['x-access-id'];
          var newPhoto = {
            image_nom: title,
            image_description: description,
            visibilite:visibilite,
            id_user:user_connecter,
            image_url: image
              };

              Photo.createPhoto(newPhoto, function(err, result){
                  if(err) throw err;
              });
          
        }
    }
    });
 });
 

//--------------------- othmane-----------------------------------------------------------------------------
// les body parser pour nos requettes post
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.set('secret', BDD.secret);



// on ne verifie pas si l'utilisateur est connecter dans la page authentification c'est la fonction unless qui le permets
//application.use(expressjwt({ secret: BDD.secret }).unless({ path: [ '/users/authentification' ]})); 

application.get('/users/Authentification', function (req, res) {

    res.render('pages/Authentification.ejs', {});
   
});


application.post('/users/Authentification', function (req, res, next) {
   
    var log = req.body.login;
    var m = req.body.mdp;
    // je recupére les bonnes variables. 

    
    utilisateur.userCo(log,m,function(user, user2,user3){
            
        if(user3.length == 0){
            res.status(204).json({
                "message": 'votre mot de passe ou votre login est incorrect !',
                success: false,
                status : 204
        });
    }   else
            {
                console.log("je suis dans le else de utilisateur co ");
                console.log(user3[0].id_personne);
                var token = jwt.sign({
                    "user": user,
                }, application.get('secret'));
                // ,  {expires : 1440}
                res.status(200).json({
                    success: true,
                    "token": token,
                    "id_user" : user3[0].id_personne,
                    "message": 'verification validé',
                    status : 200
                });
            }
    });
   
});


/* la route pour l'enregistrement */

application.get('/users/Accueil',verifToken,function (req, res, next) {
    var user_connecter = req.body.id || req.query.id || req.headers['x-access-id'];

    utilisateur.getUser(user_connecter,function(callback,callback1){
        console.log(callback1[0].login);
        res.render('pages/dashboard.ejs', { user: callback1[0].login});
    });
   
});




application.post('/users/Accueil',verifToken,function (req, res, next) {
    // Le jeton est ici : req.params.token (http://localhost:3000/users/Accueil/?token=xxx)

    res.status(200).json({
        "message": 'utilisateur authentifié'
    });
    
    next();
});



application.get('/users/Enregistrement',function (req, res, next) {
    
    res.render('pages/user.ejs', { user: user });
   
});

application.post('/users/Enregistrement',function (req, res, next) {
    // Le jeton est ici : req.params.token (http://localhost:3000/users/Accueil/?token=xxx)
   /*
    if(err){
       res.status(404).json({
           "message": "erreur lors de l'enregistrement"
       });
        throw err;
    }*/
    res.status(200).json({
        "message":"utilisateur enregistrer"
    });
    });

    application.get('/users/profilamis', verifToken ,function(req, res, next){
        //console.log("je fais le get de friends");
        var user_connecter = req.body.id || req.query.id || req.headers['x-access-id'];

            utilisateur.infoAmis(function(user){
                res.render('pages/ProfilAmis.ejs', {user : user});
            });
        console.log("je suis dans le get de profilamis");
        });
        
    application.post('/users/profilamis',verifToken,function (req, res, next) {
                res.status(200).json({
                "message":"accées page profil amis"
                });
                next();
            });

    application.get('/users/friends', verifToken ,function(req, res, next){
                var user_connecter = req.body.id || req.query.id || req.headers['x-access-id'];
                
                    utilisateur.listAmis(user_connecter,function(callback1,callback2){
                   res.render('pages/Friends.ejs',{list : callback2});
               
                    });
                });
                
    application.post('/users/friends',verifToken,function (req, res, next) {
                    // Le jeton est ici : req.params.token (http://localhost:3000/users/Accueil/?token=xxx)
                        
                    res.status(200).json({
                        "message":"accées page friends"
                        });
                        next();
                    });

    application.get('/users/ChercherAmis', verifToken ,function(req, res, next)
    {
        var user_connecter = req.body.id || req.query.id || req.headers['x-access-id'];
                        
            utilisateur.getAllUser(user_connecter,function(callback1,callback2)
            {
                res.render('pages/nv_amis.ejs',{list : callback2});
                       
            });
    });
                        
            application.post('/users/ChercherAmis',verifToken,function (req, res, next) {
                            // Le jeton est ici : req.params.token (http://localhost:3000/users/Accueil/?token=xxx)
                                
                            res.status(200).json({
                                "message":"accées page chercherAmis"
                                });
                                next();
                            });
            




    application.post('/users/ajout',verifToken,function (req, res, next) {
                        var token = req.body.jetons || req.query.jetons || req.headers['x-access-token'];
                        var userco = req.body.id_user;
                        var user_follower = req.body.id_follower
                        console.log("je fait ajout");
                        Photo.AjouterAmis(user_follower,userco,function(callback1,callback2,callback3){
                            console.log(callback3.status);
                            if(callback3.status == 200){
                                console.log('insertion reussi')
                                res.redirect("http://localhost:8080/users/friends?id="+userco+"&jetons="+token);
                            }
                         });

                    });               




function verifToken(req, res, next) {
   
    var token = req.body.jetons || req.query.jetons || req.headers['x-access-token'];
    console.log(token);

    var decoded = jwt.decode(token, BDD.secret);
   
    jwt.verify(token, BDD.secret, function (err, decode) {

        if (err) {
           
            res.redirect('/users/Authentification');
            return false
        }
        else {
            next();
        }

    });

}
application.listen(8080);
