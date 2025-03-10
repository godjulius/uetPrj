import {Routes} from '@angular/router';
import {AuthGuard, LoginGuard} from './core/services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/landing/landing.routes').then(m => m.routes)
    },
    {
        path: 'account',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.routes),
        canActivate: [LoginGuard]
    },
    {
        path: 'demo',
        loadChildren: () => import('./layout/demo/demo.routes').then(m => m.routes)
    },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(m => m.routes)
    },
    {
        path: 'user',
        loadChildren: () => import('./pages/user/user.routes').then(m => m.routes),
        // canActivate: [AuthGuard]
    }
];
