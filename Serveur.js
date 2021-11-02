const express = require('express'); // intégration du module express
const app = express();  // attribution du module dans une variable
const methodOverride = require("method-override");
const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const mongoDBsession = require('connect-mongodb-session')(sessions);
const fs = require('fs');




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("./src/public"))

// cookie parser middleware
app.use(cookieParser());
app.set('views', "./src/public");
app.set('view engine', 'ejs');



const mongoose = require('mongoose') //intégration du module mongoose
mongoose.connect("mongodb://localhost:27017/JeuProjetJS", { useNewUrlParser: true }).then(() => //connection en localhost
    console.log("Connected to Mongo…")).catch((error) =>                                //affiche message
        console.log(error.message))

const mongoURI = "mongodb://localhost:27017/JeuProjetJS";

const store = new mongoDBsession({
    uri: mongoURI,
    collection: 'sessions'
})

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    store: store
}));

const sessionSchema = new mongoose.Schema({
    session: {
        isAuth: Boolean,
        userid: String
    }
})

const ListeUtilisateur = mongoose.Schema({
    username: String,
    password: String,
    isPublished: Boolean

});
const ListeParties = mongoose.Schema({
    nomPartie: String,
    lot: { type: Number, required: true, default: 6 },
    joueur_un: {
        nomJoueur1: { type: String, required: true },
        jetons: { type: Number, default: 100 },
        mise: {type: Number, required: true, default: 0, min: 0, max:100},
        isConnected: { type: Boolean, required: true, default: false },
    },
    joueur_deux: {
        nomJoueur2: { type: String, required: true },
        jetons: { type: Number, default: 100 },
        mise: {type: Number, required: true, default: 0, min: 0, max:100},
        isConnected: { type: Boolean, required: true, default: false },
    },
    round: { type: Number, required: true, default: 1 },
    spectateur: { type: Array },
    statue: { type: String, enum: ['en Attente', 'En cours', 'Terminé'], default: 'en Attente' },
    createur: String,
    date: { type: Date, default: Date.now },

})
const MaSession = mongoose.model("Session", sessionSchema);
const Users = mongoose.model("User", ListeUtilisateur);
const GameList = mongoose.model("ListeParties", ListeParties);

async function createUsers(username, password) {
    const user = new Users({
        username: username,
        password: password,
        isPublished: true

    });
    const result = await user.save();
    console.log(result);
}



async function createGame(GameName, j1, j2, gameAuthor) {


    const Game = new GameList({
        nomPartie: GameName,
        joueur_un: {
            nomJoueur1: j1,
        },
        joueur_deux: {
            nomJoueur2: j2,
        },
        createur: gameAuthor
    });

    const result = await Game.save();
    console.log(result);

}





app.get('/', (req, res) => {

    if (!req.session.userid) {
        res.redirect('/hub');
    } else
        res.render('Index.ejs')
});


app.post('/user/login', async (req, res) => {
    await Users.findOne({

        username: req.body.username

    }).then(function (user) {
        if (!user) return res.redirect('/connexion.html');
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (!result) return res.redirect('/connexion.html');

            req.session.isAuth = true
            req.session.userid = req.body.username

            req.session.user = {
                id: user._id,
                username: user.username
            };
            //res.send(`Hey there, welcome <a href='/logout'>click to logout</a>`);

            res.redirect('/hub');
        });
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/connexion.html');
});

app.post("/users/signin", async (req, res) => {  // récupère les info contenue dans les champs du fichier html qui sont dans la balise form avec le chemin correspondant
    //console.log("POST",req.body);      // Affiche les données

    bcrypt.hash(req.body.password, 10)
        .then((hash) => {

            createUsers(req.body.username, hash);

            console.log(hash);
        })
        .catch((error) => res.status(500).json({ error }))



    res.redirect("/connexion.html");

})

app.get("/users", (req, res) => {
    res.json(users)

})

app.post("/games", (req, res) => {  // récupère les info contenue dans les champs du fichier html qui sont dans la balise form avec le chemin correspondant
    //console.log("POST",req.body);      // Affiche les données


    createGame(req.body.GameName, req.session.userid, req.body.EnemieName, req.session.userid);

    res.redirect("/hub")

})


app.get("/hub", (req, res) => {
    if (!req.session.user) return res.redirect('/connexion.html');
    res.render("listeDesParties.ejs", {})
})

app.get("/Accueil", (req, res) => {
    if (!req.session.user) return res.render('/Index.ejs');
    res.render("listeDesParties.ejs", {})
})

app.get("/jeu", (req, res) => {
    if (!req.session.user) return res.redirect('/connexion.html');
    res.render("jeu.ejs", {})
})

app.get("/recupUsers", async (req, res) => {
    await Users.find().then((users) => {
        res.json(users);
    })
})

app.get("/recupGames", async (req, res) => {
    await GameList.find().then((games) => {
        res.json(games);
    })

})



app.get('/versGames/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/hub');
    let game = await GameList.findById(req.params.id)
    if (!game) return res.redirect("/hub");
    
    let user1 = await Users.findOne({"username":game.joueur_un.nomJoueur1});
    let user2 = await Users.findOne({"username":game.joueur_deux.nomJoueur2});

    let type = null;

    if (user1.id == req.session.user.id || user2.id == req.session.user.id) {
        type = true;
    } else {
        type = false;
    }
    res.render('Jeu.ejs', {game: game, user1: user1, user2: user2, isplayer: type})
});



app.get("/deleteGame/:id", (req, res) => {

    GameList.findOne({ '_id': req.params.id }, '_id', async function (err, gamebdd) {

        await GameList.deleteOne({ '_id': req.params.id })

        res.redirect('/hub')


    })
})


app.get("/recupInfoJ", async (req, res) => {
    await Users.find().then((joueurs) => {
        res.json(joueurs);
    })
})




app.get('/session', (req, res) => {

    res.json(req.session)

})



app.listen(3000, () => { // écoute ce qu'il se passe sur le port 3000
    console.log("server started on port...");   // affiche le texte
});




