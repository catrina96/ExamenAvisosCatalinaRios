import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'publications', pathMatch: 'full' },
  {
    path: 'publications',
    loadComponent: () => import('./pages/publications/publications.page').then( m => m.PublicationsPage)
  },
  {
    path: 'publication-form',
    loadComponent: () => import('./pages/publication-form/publication-form.page').then( m => m.PublicationFormPage)
  },
];
