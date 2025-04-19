import {Routes} from '@angular/router';
import {CourseComponent} from './course/course.component';
import {CourseOverviewComponent} from './course-overview/course-overview.component';

export const routes: Routes = [
    {
        path: '',
        component: CourseComponent,
        children: [
            {
                path: 'lesson/:id',
                component: CourseOverviewComponent,
            }
        ]
    }
];
