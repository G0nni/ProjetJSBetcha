
const DateTime = luxon.DateTime;

if (window.location.pathname.startsWith("/hub")) {
    const interval = 15;
    const validTime = [0, 15, 30, 45];

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

    refreshGamesJ1();

    setTimeout(async () => {
        setInterval(async () => {

            console.log("LETS GOOOOOO");
            await refreshGamesJ1();



        }, interval * 1000);



    }, new_time.diff(DateTime.now()).toObject().milliseconds)

}

async function RefreshGamesInfoJ1() {
    const liste = document.querySelector(".j1");
    

    let actualItems = [];

    for (let index = 0; index < liste.children.length; index++) {       //stocke tt les id déjà existant
        const element = liste.children[index];
        actualItems.push(element.id);
    }

    await fetch("/recupGames").then(reponse => reponse.json())
        .then(async data => {
            data.forEach(async users => {

                await actualItems.splice(actualItems.indexOf(users._id), 1); // retire l'élément de la liste

                if (document.getElementById(users._id)) {
                    let item = document.getElementById(users._id);
                    item.innerHTML = " Nom j1: " + users.joueur_un.nomJoueur1 + "<br> jetons : " + users.joueur_deux.jetons;
                }
                else {
                    let li = document.createElement("li");
                    li.id = users._id
                    li.innerHTML = " Nom j1: " + users.joueur_un.nomJoueur1 + "<br> jetons : " + users.joueur_deux.jetons;
                    liste.appendChild(li);
                }

            });
        })
    await actualItems.forEach(actualItem => {       // récupère l'item et le supprime ( supprime les game qui n'existe plus )
        let obj = document.getElementById(actualItem);
        obj.parentNode.removeChild(obj);
    })
}