# ProjetJSBetcha

Grille de notation BACK (sur 33 points): 18/33 <br>
--------------------------------------------------------------------------------
Les users sont stockés en BDD : 1 point										FAIT<br><br>
Les mots de passe sont stockés en base de données sous forme hashée+salée avec bcryptjs : 1 point		FAIT <br><br>
Les parties sont stockées en BDD : 1 point									FAIT <br><br>
Les users ont des parties : 1 point										FAIT <br><br>
Une partie appartient à un seul user : 1 point									FAIT <br><br>



--------------------------------------------------------------------------------


chaque participant peut se créer un compte : 2 points								FAIT <br><br>
chaque participant peut s'authentifier : 1 point								FAIT <br><br>
chaque participant peut se deconnecter : 1 point								FAIT <br><br>

On peut créer une nouvelle partie : 2 points									FAIT <br><br>
Il faut etre logué pour créer une partie : 1 point								FAIT <br><br>
On peut lister les parties : 2 points										FAIT<br><br>
Il faut etre logué pour lister les parties : 1 point								FAIT<br><br>

--------------------------------------------------------------------------------

si l'utilisateur n'est pas l'adversaire, la partie sera affichée du point de vue d'un spectateur : 1 point<br><br>
si l'utilisateur participe à la partie, la partie sera affichée du point de vue du joueur : 1 point<br><br>

--------------------------------------------------------------------------------

le créateur de la partie peut supprimer cette partie : 1 point							FAIT<br><br>
on ne peut pas supprimer une partie dont on est pas le créateur : 1 point					FAIT<br><br>

--------------------------------------------------------------------------------

chaque joueur possède initialement 100 jetons : 1 point								FAIT<br><br>
Chaque joueur mise en secret un certain nombre de jetons (entre 0 et 100) : 2 points<br><br>
Celui qui a misé le plus se voit retirer le montant de sa mise de ses jetons, mais voit le lot avancer d'un cran dans sa direction : 3 points<br><br>
le joueur qui n'a pas remporté le pari garde sa mise et ne perd aucun jeton : 2 points<br><br>
Les joueurs continuent à parier jusqu'à que le lot arrive sur l'emplacement d'un des joueurs : 1 point<br><br>
Les joueurs continuent à parier jusqu'à que les deux joueurs n'aient plus de jetons : 1 point<br><br>
Les joueurs continuent à parier jusqu'à 20 paris maximum : 1 point<br><br>
Si le lot arrive sur l'emplacement d'un joueur, ce joueur remporte le lot (vainqueur), la partie est terminée : 3 points<br><br>

--------------------------------------------------------------------------------

<br><br><br><br>
Grille de notation FRONT (sur 24 points): 14/24 	( y'a le theme sombre zebi)
--------------------------------------------------------------------------------

Il y a un bouton "créer un compte" : 2 points					FAIT <br><br>
Il y a un bouton "s'authentifier" : 1 point					FAIT <br><br>
Il y a un bouton "se deconnecter" : 1 point					FAIT<br><br>

Il y a un bouton "créer une nouvelle partie" : 2 points				FAIT<br><br>
On peut lister les parties : 2 points						FAIT<br><br>

Pour chaque partie de la liste, on voit son nom, son adversaire,son état, un lien pour afficher la partie : 1 point	FAIT<br><br>

si l'utilisateur n'est pas l'adversaire, la partie sera affichée du point de vue d'un spectateur : 1 point<br><br>
si l'utilisateur participe à la partie, la partie sera affichée du point de vue du joueur : 1 point<br><br>

le créateur de la partie peut supprimer cette partie : 1 point			FAIT<br><br>
on ne peut pas supprimer une partie dont on est pas le créateur : 1 point	FAIT<br><br>

On voit 11 emplacements contigus : 2 points					FAIT<br><br>
On voit le nom et nombre de jetons des joueurs : 1 point<br><br>
On peut miser : 3 points<br><br>
un pari est généré automatiquement après 30 secondes (entre 0 et le nombre de jetons du joueur) : 1 point<br><br>
la partie sera mise à jour sans intervention de l'utilisateur : 3 points<br><br>
On voit le nom du gagnant : 1 point<br><br>
