import {Routes} from '@angular/router';
import {CourseComponent} from './course/course.component';

export const routes: Routes = [
    {
        path: 'lesson/:lessonId',
        component: CourseComponent,
        children: []
    },
    {
        path: 'quiz/:lessonId',
        component: CourseComponent,
        children: []
    }
];
