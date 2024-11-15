# Angular from scratch presentation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

Update to v18 : [update-guide](https://angular.dev/update-guide?v=17.0-18.0&l=1).

## Prérequis

[Angular Prerequisites](https://angular.dev/tools/cli/setup-local)

### Installer :
* [NodeJS](https://nodejs.org/en)
* [Angular CLI](https://angular.dev/cli)


## Points de base abordés

* création d’un projet et configuration
  * configuration de TypeScript : `tsconfig.json`
    * alias des imports
  * configuration de Angular : `angular.json`
* `package.json`
  * scripts : alias vers des commandes
  * dépendances du projet aux autres lib (de dev. ou de prod.)
  * dépendance installées dans `node_modules`
    * `npm install`
* build du projet : `ng build`
  * compilation du projet et sortie de production dans le repertoire `dist`
* rendu de l'application en local avec rechargement/compilation à chaud : `ng serve`
* injection de dépendances
  * par le constructeur, ou avec la méthode `inject()`
  * rendre un service injectable en `singleton` :
  ```typescript
     @Injectable({
       providedIn: 'root',
     })
     export class MyService {
     }
  ```
* création de composants
  ```bash
    ng generate component [name]
  
    # alias:
    ng g c [name]
  
    # Avec le template dans le fichier .ts
    ng g c [name] -t
  ```
* gestion des routes
  * navigation dans l'application et contenu dynamique sous le noeud `<router-outlet/>`
  * avec et sans lazy-loading
  * guard
* introduction de [RxJs](https://rxjs.dev/) (détail dans une prochaine présentation)
* création d'un formulaire
* gestion du dialogue entre composants enfant et parent avec "input et output"

## Nouveautés de Angular

### Standalone

Possibilité d'avoir des composants "autonomes" et de se passer des "modules".

Cela est encore spécifié dans le décorateur du composant `standalone: true`.
```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-from-scratch-presentation';
}
```

Cette valeur sera à `true` par défaut dans la prochaine version de Angular. 


### Control flow

Simplification du template HTML avec : `@for`, `@if` et `@switch`.

### Les signals

Très bon article qui présente les signals : [Angular Signals (The future of Angular)](https://itnext.io/angular-signals-the-future-of-angular-395a69e60062)

Grace au `signals` Angular se sépare petit à petit de `zone.js` ([Qu'est ce que zone.js utilisé dans Angular ?](https://angular.fr/lifecycle/zonejs)).
Un jour Angular sera `zoneLess`.

`Signal` pourrait donc permettre de gagner en performance en étant plus “macro” sur les modifications du DOM.

#### Writable signals

```tsx
const count: WritableSignal<number> = signal<number>(0);

// Signals are getter functions - calling them reads their value.
console.log('The count is: ' + count());
```

```tsx
count.set(3);
```

```tsx
// Increment the count by 1.
count.update(value => value + 1);
```


#### Computed signals

```tsx
const count: WritableSignal<number> = signal(0);

const doubleCount: Signal<number> = computed(() => {
	return count() * 2;
});
```

La fonction **computed()** retourne un nouveau signal qui se met automatiquement à jour chaque fois que ses dépendances changent.

#### Effects

```tsx
effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

Pour appliquer un effet de bord.

**Effect** planifie et exécute une fonction à effet secondaire dans un contexte réactif.

La fonction à l'intérieur de l'**effet** sera réévaluée avec tout changement qui se produit dans les **signaux** appelés à l'intérieur. Plusieurs signaux peuvent être ajoutés à la fonction **d'effet** .

Par défaut, enregistrer un nouvel **effet nécessite un contexte d'injection**. Le moyen le plus simple de fournir cela est d'appeler effect dans un constructeur.



##### untracked

[Angular Signals — Preventing Unnecessary Dependencies Using the Untrack Function](https://netbasal.com/angular-signals-preventing-unnecessary-dependencies-using-the-untrack-function-15a4c03b03fe)

```tsx
const count: WritableSignal<number> = signal(0);
const count2: WritableSignal<number> = signal(0);

///////////////////////////////////////////////////

effect((): void => {
	console.log(`The current count is: ${count()}`);

  untracked(() => {
    // effect() ne sera pas déclenché si count2 est mis à jour
    console.log(`The current count is: ${count2()}`);
  });
      
});
```


