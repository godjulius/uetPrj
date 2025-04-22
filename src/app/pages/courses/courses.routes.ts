import {Routes} from '@angular/router';
import {CourseComponent} from './course/course.component';
import {CourseContentComponent} from './course-content/course-content.component';

export const routes: Routes = [
    {
        path: 'lesson/:lessonId',
        component: CourseComponent,
        children: [
            // {
            //     path: 'lesson/:id',
            //     component: CourseContentComponent,
            // }
        ]

    }
];
