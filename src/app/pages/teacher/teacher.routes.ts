import {Routes} from '@angular/router';
import {TeacherComponent} from './teacher/teacher.component';

export const routes: Routes = [
    {
        path: '',
        component: TeacherComponent,
        children: [

        ]
    }
];
