# To-Do List – TP 2 Angular

Application de gestion de tâches réalisée en Angular pour le TP 2 du module Framework JS.

## Fonctionnalités

- Ajouter une tâche avec un titre (obligatoire, 3 caractères minimum hors espaces), une
  description et une date d'échéance (facultatives, la date ne peut pas être dans le passé).
- Le bouton « Ajouter » est désactivé tant que le titre est trop court et le formulaire se vide
  après l'ajout.
- Cocher / décocher une tâche (à faire / faite) avec un compteur « X à faire / Y faites ».
- Modifier une tâche (titre, description, échéance) avec les mêmes règles de validation.
- Supprimer une tâche après confirmation.
- Filtrer par statut (toutes / à faire / faites) et rechercher par titre.
- Tri par date d'échéance puis par titre (les tâches sans échéance sont à la fin).
- Page `/stats` : total, faites, à faire et pourcentage de tâches terminées (0 % si la liste
  est vide).
- Les tâches sont sauvegardées dans le `localStorage` et restent après un rechargement.

## Installation

Prérequis : Node.js 20.19 ou plus récent et npm.

```bash
git clone https://github.com/Detruni/to-do-list.git
cd to-do-list
npm install
npm start
```

L'application est ensuite disponible sur http://localhost:4200.

## Scripts

| Commande        | Description                                  |
| --------------- | -------------------------------------------- |
| `npm start`     | Lance le serveur de développement            |
| `npm run build` | Génère la version de production dans `dist/` |
| `npm test`      | Lance les tests unitaires (Vitest)           |

## Structure

```
src/app/
├── app.ts               composant principal : menu de navigation + router-outlet
├── app.routes.ts        routes '' (liste) et 'stats'
├── app.config.ts        configuration (provideRouter)
├── task.ts              interface Task + fonctions today() et validateTask()
├── task.service.ts      TaskService : liste des tâches, actions et localStorage
├── task.service.spec.ts tests unitaires
├── task-list/           page liste : formulaire d'ajout, filtres, liste
├── task-item/           une tâche : case à cocher, modification, suppression
└── stats/               page statistiques
```

## Explications

**TaskService** : c'est lui qui gère les tâches. La liste est stockée dans un `signal`. Les
méthodes `add`, `update`, `toggle` et `remove` créent à chaque fois un nouveau tableau. Au
démarrage, les tâches sont lues dans le `localStorage`, puis un `effect` les sauvegarde à
chaque modification.

**Formulaires** : formulaires template-driven avec `[(ngModel)]` (FormsModule). La validation
est faite dans la fonction `validateTask()` du fichier `task.ts`, utilisée à la fois pour
l'ajout et pour la modification.

**Dates** : on utilise un `<input type="date">` qui donne une date au format `YYYY-MM-DD`. La
fonction `today()` donne la date du jour au même format, ce qui permet de comparer les deux
dates directement.

**Filtres et tri** : le statut et la recherche sont des signals. La liste affichée est un
`computed` qui filtre puis trie les tâches du service. Le service garde donc toujours toutes
les tâches, le filtre ne supprime rien.

**Communication entre composants** : `TaskItem` reçoit la tâche avec `input()` et prévient la
page liste avec des `output()` (`toggled`, `removed`, `saved`). C'est la page liste qui appelle
le service.

**Événements utilisés** : `(ngSubmit)`, `(click)`, `(change)`, `(keyup.escape)` pour annuler
la modification, et `$event` pour récupérer les données envoyées par `TaskItem`.

**Routing** : deux routes déclarées avec `provideRouter`, navigation avec `routerLink` sans
rechargement de la page.

**Accessibilité** : chaque champ a un `<label>` relié à son `id`, les erreurs sont affichées
sous le champ concerné.

**Performance** : `@for` avec `track task.id` pour qu'Angular ne recrée pas toute la liste à
chaque changement, et `computed` pour ne recalculer le filtre et les compteurs que quand c'est
nécessaire.
