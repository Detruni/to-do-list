import { Routes } from '@angular/router';
import { Stats } from './stats/stats';
import { TaskList } from './task-list/task-list';

export const routes: Routes = [
  { path: '', component: TaskList, title: 'Mes tâches' },
  { path: 'stats', component: Stats, title: 'Statistiques' },
  // Redirection automatique si l'URL est inconnue
  { path: '**', redirectTo: '' },
];
