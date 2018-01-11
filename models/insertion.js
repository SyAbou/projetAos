var mysql = require('mysql');

var con = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
	user: 'root',
	password : '',
    database: 'aos'
});

var Photo = module.exports

module.exports.createPhoto = function(newPhoto, callback){

            var photo = {image_nom:newPhoto.image_nom, image_description:newPhoto.image_description, id_user: newPhoto.id_user, visibilité:newPhoto.visibilite, image_url:newPhoto.image_url};
            console.log(photo);
            con.query("INSERT INTO photo SET ?", photo, function (err, result) {
                if (err) throw err;
                console.log("1 photo inserée");
                return callback(null, result);
            });
        }

exports.AjouterAmis = function(user_follower,userco,callback){

var user= {id_follower: user_follower, nom : "test", id_personne : userco }
con.query("INSERT INTO follower SET ?", user, function (err, result) {
            if (err) throw err;
            else{
            console.log("ami ajouter");
        var res = {"message":"insertion reussi",status : 200}   
            callback(null,null,res);
        }
});


}