import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/landing/landing.routes').then(m => m.routes)
    },
    {
        path: 'account',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.routes)
    }
];
