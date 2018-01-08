![logo](https://hal.archives-ouvertes.fr/UNIV-PARIS-SACLAY/public/logo_UP_saclay_final.png)

## **ViewShare**

> L'application  **ViewShare**  est un outil de partage de photos ou vidéos personnelles avec ses amis. Elle permettra de:
 >- <i class="icon-file"></i> poster une photo
> - <i class="icon-trash"></i>supprimer une photo
 >- <i class="icon-pencil"></i> modifier une photo
 >- <i class="icon-upload"></i>télécharger une photo afin de la poster



----------


## **Contributeurs**

 - Hajar BENKOULOUCHE
 - Aminata CISSE
 - Othmane HANINE


----------
## **Prérequis**
 - Nodejs [(Lien pour l'installation)](https://nodejs.org/en/)
 - Github [(Instructions)](https://git-scm.com/downloads)

----------
## **Technologies utilisées**


 - Nodejs [(lien pour l'installation)](https://nodejs.org/en/)
 - Mysql
 - HTML,CSS, BOOTSTRAP
 - REST


----------
## **Installation**

    git clone https://github.com/AminaDado/projetAos.git
>Une fois que le projet téléchargé, on se place dans ce dernier avec le terminal afin d'installer toutes les dépendances

 1. Installer les dépendances
 
    npm install
    

 2. Lancer le serveur
 
    node utilisateur.js

----------
## **Configuration de la base de données**
> **Attention!** Ne pas oublier d'impoter la base de données.
   
   

       var mysql = require('mysql');
        var con = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
        	user: 'root',
        	password : '',
            database: 'aos'
        });

## **Api rest**

>Voir le document API rest 
 ----------
