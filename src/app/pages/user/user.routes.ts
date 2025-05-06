import {Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {UserComponent} from './user/user.component';
import {UserCoursesComponent} from './user-courses/user-courses.component';
import {AttendingCoursesComponent} from './attending-courses/attending-courses.component';
import {CourseEditComponent} from './course-edit/course-edit.component';
import {InstructorGuard} from '../../core/guards/instructor.guard';

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
                canActivate: [InstructorGuard],
            },
            {
                path: 'attending-courses',
                component: AttendingCoursesComponent,
            },
            {
                path: 'user-courses/:courseId',
                component: CourseEditComponent,
                canActivate: [InstructorGuard],
            },
            {
                path: 'user-courses/new',
                component: CourseEditComponent,
                canActivate: [InstructorGuard],
            },
            {
                path: 'statistics',
                loadComponent: () => import('./statistics/statistics.component').then(m => m.StatisticsComponent),
                canActivate: [InstructorGuard],
            }
        ]
    }
];
