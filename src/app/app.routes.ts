import { Routes } from '@angular/router';

export function guard(): boolean {
  return true;
}

export const MAIN_ROUTES: Routes = [
  // {
  //   path: 'todo-list',
  //   // sans lazy-loading
  //   component: TodoListComponent,
  // },
  {
    path: 'todo-list',
    // avec lazy-loading d'un composant
    loadComponent: () => import('./todo-list/todo-list.component').then(x => x.TodoListComponent),
    canActivate: [guard],
  },
  // {
  //   path: 'todo-list',
  //   // avec lazy-loading d'un sous-ensemble de routes
  //   loadChildren: () => import('./todo-list/todo-list-routes').then(x => x.TODO_LIST_ROUTES),
  // },
];
