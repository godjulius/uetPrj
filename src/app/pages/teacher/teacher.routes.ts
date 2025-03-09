import {Routes} from '@angular/router';
import {TeacherComponent} from './teacher/teacher.component';
import {ProfileComponent} from './profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        component: TeacherComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
            },
        ]
    }
];
