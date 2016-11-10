# zenchat-client-ng1

L'objectif de ce TP est de découvrir les derniers concepts d'AngularJS 1.5 en implémentant une application basique de chat. 4 étapes sont nécessaires pour obtenir un résultat fonctionnel.

La correction de chaque étape est implémentée dans une branche `git` et vous permet à tout moment de repartir sur une base de code propre (`git checkout step-X`, avec X un chiffre de 1 à 4).

L'application de démarrage pour le TP se trouve sur la branche `master`. Récupérez le projet existant (`git clone https://github.com/nicolaspayot/zenchat-client-ng1.git`) puis installez les dépendances requises en exécutant la commande `npm install` à la racine du projet cloné. `npm start` vous permet de lancer le serveur de développement local. Si tout se passe bien, vous devriez avoir accès à l'application web sur `http://localhost:3000`.

### Etape 1

Tout le code HTML se trouve pour l'instant dans le fichier `src/app/zenchat.html`. La première étape consiste à mettre en place des composants pour simplifier ce template trop chargé.
- Créez un composant `znkHeader` dans un fichier `src/app/header/znk-header.component.js`. Il contient le contenu de la balise `<header>`.
- Créez un composant `znkFooter` dans un fichier `src/app/footer/znk-footer.component.js`. Il contient le contenu de la balise `<footer>`.
- Créez un composant `messageList` dans un fichier `src/app/message/message-list.component.js`. Il contient le contenu de la balise `<main>` (la liste des messages à afficher).
- Enfin, créez un composant `message` dans un fichier `src/app/message/message.component.js`. Il contient le contenu de chaque message, c'est à dire la balise `<div class="message">`. Ce composant va être utilisé autant de fois qu'il y a de messages. Il doit donc pouvoir recevoir des données en entrée (`bindings`). Ces attributs sont les suivants : `avatar`, `sender`, `timestamp`, `content`.

N'oubliez pas d'importer tous ces composants dans le module Angular principal de l'application, le fichier `src/index.js`.

### Etape 2

La deuxième étape consiste à retirer du HTML le contenu des messages en dur pour créer une liste sur laquelle nous allons itérer. Le dossier `src/app/message` va contenir de nouveaux fichiers, il est donc utile de créer un sous module `zenchat.message` dans un fichier `src/app/message/index.js`. N'oubliez pas d'importer ce dernier dans le module principal de l'application.

- Utilisez le contenu de la liste [ici](https://gist.github.com/nicolaspayot/4b1962e47d37186643c2a4c20f2cc47a) pour créer un fichier `src/app/message/messages.js`.
- Créez un service `MessageService` dans un fichier `src/app/message/message.service.js`, dont le rôle est de retourner la liste des messages dans une méthode `getMessages()`. Ce service va être utilisé par le composant `messageList` grâce à un contrôleur `MessageListController` (fichier `src/app/message/message-list.controller.js`) qu'il faudra associer au composant.
- Instanciez une variable `messages` dans le contrôleur précédemment créé pour stocker la liste des messages du service (utilisez la méthode `$onInit() { ... }` pour effectuer cette tâche plutôt que dans le constructeur du contrôleur).
- Utilisez la directive `ng-repeat` sur la balise `<message>` dans le template HTML de `messageList` pour afficher chaque message.

Maintenant que les messages se trouvent dans une liste, vous pouvez simplifier le composant `message` en remplaçant ses attributs par un seul et unique attribut : `data`, qui contiendra chaque objet *message* au complet.

N'oubliez pas d'importer tous ces composants dans le module Angular `zenchat.message`.

### Etape 3

Dans cette troisième étape, nous allons effectuer une requête Ajax avec le service `$http` pour récupérer la liste de messages sur un serveur REST. L'URL à utiliser est la suivante : http://localhost:8080/api/messages.

- Injectez le service `$http` dans le service `MessageService` et modifiez l'implémentation de la méthode `getMessages()` pour qu'elle retourne une promesse (appel à `$http.get`) qui contiendra la liste des messages, une fois résolue.
- Supprimez le dossier `src/img/` et la liste des messages en dur. Normalement, les messages doivent s'afficher mais sans les avatars. En effet, les liens retournés sont de la forme `img/avatar.png`. Il vous faut donc créer un contrôleur (`MessageController`) pour le composant `message` afin de construire l'URL complète pour accéder à l'avatar du message courant. Cette dernière a la forme suivante : `http://localhost:8080/img/avatar.png`.

### Etape 4

La dernière étape consiste à permettre l'envoi d'un message et l'affichage instantané de tous les nouveaux messages.

- Utiliser le service `MessageService` pour implémenter une méthode `send(message)`. Cette méthode effectue une requête POST sur l'URL http://localhost:8080/api/messages avec pour paramètre un objet `{ message }` (*ES2015 shorthand notation*).
- Ajouter un contrôleur `FooterController` au composant `footer` afin de récupérer le contenu du nouveau message (directive `ng-model` sur le champ de saisie) et d'appeler la méthode `send` de `MessageService` sur l'évènement `click` du bouton "SEND" (directive `ng-click`).

Votre message devrait s'afficher dans la liste après un rechargement de la page.

Pour implémenter la fonction d'affichage automatique de chaque message, nous allons utiliser une WebSocket avec `socket.io`.

- Installez la dépendance suivante : `npm install --save socket.io-client`
- Importez le module `io` dans `MessageService` : `import io from 'socket.io-client';` puis ouvrez une connection sur l'URL http://localhost:8080 dans le constructeur du service : `this.socket = io(HOST_URL)`.
- Enfin, implémentez une méthode `onNewMessagesEvent()` qui prend en paramètre une callback qui sera executée lorsque l'évènement `message/new` sera intercepté : `this.socket.on('message/new', () => callback());`.

C'est au contrôleur `MessageListController` que revient la charge d'effectuer un rechargement de la liste des messages à chaque fois qu'un nouveau message est envoyé : `this.MessageService.onNewMessagesEvent(() => { ... });`.

Comme vous pouvez le remarquer, l'écran qui contient la liste des messages ne scroll pas automatiquement vers le bas à chaque nouveau message, ce qui n'est pas idéal. Pour effectuer cette tâche, vous pouvez utiliser la méthode suivante :
```
scrollToBottom() {
  const parent = this.$element.parent()[0];
  this.$timeout().then(() => {
    parent.scrollTop = parent.scrollHeight;
  });
}
```
N'oubliez pas d'injecter `$element` et `$timeout` dans le contrôleur. Appelez cette méthode à chaque fois que la liste des messages est rechargée.

