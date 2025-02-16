import { Routes } from '@angular/router';
import { HomeComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./components/jobs/jobs.component').then((m) => m.JobsComponent),
  },
];
