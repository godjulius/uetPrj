import {Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {UserComponent} from './user/user.component';
import {UserCoursesComponent} from './user-courses/user-courses.component';
import {AttendingCoursesComponent} from './attending-courses/attending-courses.component';
import {CourseEditComponent} from './course-edit/course-edit.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'user-courses',
                component: UserCoursesComponent,
            },
            {
                path: 'attending-courses',
                component: AttendingCoursesComponent,
            },
            {
                path: 'user-courses/edit',
                component: CourseEditComponent,
            },
            {
                path: 'user-courses/new',
                component: CourseEditComponent,
            }
        ]
    }
];
