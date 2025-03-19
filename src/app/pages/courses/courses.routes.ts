import {Routes} from '@angular/router';
import {CourseComponent} from './course/course.component';

export const routes: Routes = [
    {
        path: '',
        component: CourseComponent,
        children: [

        ]
    }
];
