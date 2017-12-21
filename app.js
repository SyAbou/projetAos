var http = require('http');
var url = require('url');
var multer=require('multer');
var ejs = require('ejs');
var mysql = require('mysql');
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const util = require('util');
const path = require('path');

var Photo = require('./models/insertion');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var con = mysql.createConnection({
    host: 'localhost',
    port: 8889,
	user: 'root',
	password : 'root',
    database: 'aos'
});

app.set('view engine', 'ejs');


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
// redirection vers connexion

app.get('/', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      res.render('connexion');
});

/*app.get('/profil', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
    var photos=[];
    con.query("SELECT * FROM photo", function (err, result) {
    if (err)
        throw err;
    photos=result;
    res.render('profil', {photos});
    });    
});*/

app.use(express.static('./ressources'));



app.get('/profil', (req, res) => {
    //var insertion= "INSERT INTO photo (image_id,"
    con.query("SELECT * FROM photo", function(err, result){
    if(err) throw err;
    res.render('profil', {
      msg: 'Image publié!',
      images: result//`uploads/${req.file.filename}`
    });
  })
});


app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('profil', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('profil', {
          msg: 'Error: Aucun image séléctionné!'
        });
      } else {
        console.log("bonjour");
        con.query("SELECT * FROM photo", function(err, result){
          if(err) throw err;
          res.render('profil', {
            msg: 'Image publié!',
            images: result//`uploads/${req.file.filename}`
          });
        })

        var image = "uploads/"+req.file.filename;
        var title = "test";//req.body.title; 
        var description= "test";
        var visibilite= "1";
        var user="1";
        var newPhoto = {
          image_nom: title,
          image_description: description,
          visibilite:visibilite,
          id_user:user,
          image_url: image 

            };

            Photo.createPhoto(newPhoto, function(err, result){
                if(err) throw err;
            });
        
      }
    }
  });
});

app.listen(8080, function () {
    console.log('listening on port 8080!')
})
