var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var BDD = require('./config/BDD');

//var Storage = require('session-storage').create('redis', {
// host: 'http://localhost:8080'
//});
//var jwt = require('jwt-simple');
//var expressjwt = require('express-jwt');

var application = express();

// les body parser pour nos requettes post
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.set('secret', BDD.secret);
var user = {
    id: 1,
    login: 'hanine',
    mdp: 'othmane'
};


// on ne verifie pas si l'utilisateur est connecter dans la page authentification c'est la fonction unless qui le permets
//application.use(expressjwt({ secret: BDD.secret }).unless({ path: [ '/users/authentification' ]})); 

application.get('/users/Authentification', function (req, res) {

    res.render('pages/Authentification.ejs', {});
   
});


application.post('/users/Authentification', function (req, res, next) {
   
    var log = req.body.login;
    var m = req.body.mdp;
    
       
        if (log == user.login && m == user.mdp) {
            var token = jwt.sign({
                "user": user,
            }, application.get('secret'));
            // ,  {expires : 1440}
            res.json({
                "success": true,
                "token": token,
                "message": 'verification validé'

            });
        } else {
            //res.status(500).json()
            res.json({
                "message": 'votre mot de passe est incorrect !',
                "success": false,
                
            })
        }

   
});

// verifie l'authentification de l'utilisateur a chaque connexion



/* la route pour l'enregistrement */

application.get('/users/Accueil',verifToken,function (req, res, next) {
    
    res.render('pages/dashboard.ejs', { user: user });
    
    
    console.log('page retourner');
   
});




application.post('/users/Accueil',verifToken,function (req, res, next) {
    // Le jeton est ici : req.params.token (http://localhost:3000/users/Accueil/?token=xxx)


    console.log('realise le post de Accueil');

    res.json({
        "message": 'utilisateur authentifié'
    });
    
    next();
});



application.get('/users/Enregistrement',function (req, res, next) {
    
    res.render('pages/user.ejs', { user: user });
   
});

application.post('/users/Enregistrement',function (req, res, next) {
    // Le jeton est ici : req.params.token (http://localhost:3000/users/Accueil/?token=xxx)
   
    res.status(200).json({
        "message":"utilisateur enregistrer"
    });
    });




function verifToken(req, res, next) {
   
    var token = req.body.jetons || req.query.jetons || req.headers['x-access-token'];
    console.log(token);

    var decoded = jwt.decode(token, BDD.secret);
   
    jwt.verify(token, BDD.secret, function (err, decode) {

        if (err) {
            console.log("erreur du verif");
            res.redirect('/users/Authentification');
            return false
        }
        else {
            console.log("j'ai fait le else de verif");
            next();
        }

    });

}


application.listen(8080);


