

const DateTime = luxon.DateTime;
let session;
document.addEventListener('DOMContentLoaded', async (req, res) => {

    fetch('/session').then((userdata) => {

        return userdata.json()

    }).then((reponseUser)=>{

        if (reponseUser.userid == undefined || reponseUser.userid == null){
            window.location.replace("/")
        } else{
            session = reponseUser;
            
            if (window.location.pathname.startsWith("/hub")) {
                const interval = 5;
                const validTime = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
            
                let next_time = DateTime.now();
                let check = validTime.find(t => t >= next_time.second);
                let cloak_time = (check) ? check : validTime[0];
            
                let params = {};
                if (cloak_time == 0) {
                    params.minutes = next_time.minute + 1;
                    params.seconds = 0;
                } else {
                    params.seconds = cloak_time;
                }
                let new_time = DateTime.now().set(params);
            
                refreshGames();
                recupUserCombo();
                setTimeout(async () => {
                    setInterval(async () => {
            
                        console.log("refresh");
                        await refreshGames();
                        await recupUserCombo();
            
            
            
                    }, interval * 1000);
            
            
            
                }, new_time.diff(DateTime.now()).toObject().milliseconds)
            
            }

            async function refreshGames() {
                const liste = document.querySelector(".ul-listePartie");
                let MaSession= session;
                let actualItems = [];
            
                for (let index = 0; index < liste.children.length; index++) {       //stocke tt les id déjà existant
                    const element = liste.children[index];
                    actualItems.push(element.id);
                }
            
                await fetch("/recupGames").then(reponse => reponse.json())
                    .then(async data => {
                        data.forEach(async game => {
            
                            await actualItems.splice(actualItems.indexOf(game._id), 1); // retire l'élément de la liste
            
                            if (document.getElementById(game._id)) {
                                let item = document.getElementById(game._id);
                                if (game.createur == MaSession.userid){
                                    item.innerHTML = " Nom de la partie: " + game.nomPartie + "<br> Joueur 1: " + game.joueur_un.nomJoueur1 + "<br> Joueur 2 : " + game.joueur_deux.nomJoueur2 + "<br> Etat : " + game.statue +"<br><form action='/deleteGame/"+game._id+"' method='get'><button class='btn btn-primary btn-sm' type='submit'>Supprimer</button></form> "
                                    +"<br> <a href='/versGames/"+game._id+"'><button class='btn btn-primary btn-sm' type='submit'" + game._id +"'>Rejoindre</button></a>";
                                }else{
                                    item.innerHTML = " Nom de la partie: " + game.nomPartie + "<br> Joueur 1: " + game.joueur_un.nomJoueur1 + "<br> Joueur 2 : " + game.joueur_deux.nomJoueur2 + "<br> Etat : " + game.statue 
                                    +"<br> <a href='/versGames/"+game._id+"'><button class='btn btn-primary btn-sm' type='submit'" + game._id +"'>Rejoindre</button></a>";    
                                }
                                
            
            
                            }
                            else {
                                let li = document.createElement("li");
                                li.id = game._id
                                if (game.createur==MaSession.userid){
                                    li.innerHTML = " Nom de la partie: " + game.nomPartie + "<br> Joueur 1: " + game.joueur_un.nomJoueur1 + "<br> Joueur 2 : " + game.joueur_deux.nomJoueur2   + "<br> Etat : " + game.statue+ "<br><form action='/deleteGame/"+game._id+"' method='get'><button class='btn btn-primary btn-sm' type='submit'>Supprimer</button></form> "
                                +"<br> <a href='/versGames/"+game._id+"' method='get'><button class='btn btn-primary btn-sm' type='submit'" + game._id +"'>Rejoindre</button></a>";
                                liste.appendChild(li);
                                }else{
                                    li.innerHTML = " Nom de la partie: " + game.nomPartie + "<br> Joueur 1: " + game.joueur_un.nomJoueur1 + "<br> Joueur 2 : " + game.joueur_deux.nomJoueur2   + "<br> Etat : " + game.statue 
                                +"<br> <a href='/versGames/"+game._id+"' method='get'><button class='btn btn-primary btn-sm' type='submit'" + game._id +"'>Rejoindre</button></a>";
                                liste.appendChild(li);
                                }
                                
                                
            
                            }
            
                        });
                    })
                await actualItems.forEach(actualItem => {       // récupère l'item et le supprime ( supprime les game qui n'existe plus )
                    let obj = document.getElementById(actualItem);
                    obj.parentNode.removeChild(obj);
                })


                
            }
            async function recupUserCombo() {
                const liste = document.querySelector(".browsers");
                let actualItems = [];
            
                for (let index = 0; index < liste.children.length; index++) {       //stocke tt les id déjà existant
                    const element = liste.children[index];
                    actualItems.push(element.id);
                }
            
                await fetch("/recupUsers").then(reponse => reponse.json())
                    .then(async data => {
                        data.forEach(async users => {
                            //console.log(users);
            
                            await actualItems.splice(actualItems.indexOf(users._id), 1); // retire l'élément de la liste
            
                            if (document.getElementById(users._id)) {
                                let item = document.getElementById(users._id);
                                
                                item.innerHTML = users.username;
                                liste.appendChild(item);

                            }
                            else {
                                let select = document.createElement("option");
                                select.id = users._id
                               
                                select.innerHTML = users.username;
                                liste.appendChild(select);             
                                
            
                            }
            
                        });
                    })
                await actualItems.forEach(actualItem => {       // récupère l'item et le supprime ( supprime les game qui n'existe plus )
                    let obj = document.getElementById(actualItem);
                    obj.parentNode.removeChild(obj);
                })


                
            }
        }

    })


    


})









/*
let toggle_btn = document.getElementById('theme-btn');

let body = document.getElementsByTagName('body')[0];



let dark_theme_class = 'dark';



toggle_btn.addEventListener('click', function() {

 if (body.classList.contains(dark_theme_class)) {



 body.classList.remove(dark_theme_class);

}

 else {

 body.classList.add(dark_theme_class);

}

});
*/


