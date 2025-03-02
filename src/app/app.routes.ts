import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/landing/landing.routes').then(m => m.routes)
    },
    {
        path: 'account',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.routes)
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
        path: 'teacher',
        loadChildren: () => import('./pages/teacher/teacher.routes').then(m => m.routes)
    }
];
