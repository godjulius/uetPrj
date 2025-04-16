import {Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {LandingHomePageComponent} from './landing-home-page/landing-home-page.component';
import {CoursesSearchComponent} from './courses-search/courses-search.component';
import {CoursePreviewComponent} from './course-preview/course-preview.component';
import {InstructorComponent} from './instructor/instructor.component';


export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        children: [
            {
                path: '',
                component: LandingHomePageComponent
            },
            {
                path: 'courses',
                component: CoursesSearchComponent
            },
            {
                path: 'course/:id',
                component: CoursePreviewComponent
            },
            {
                path: 'instructor/:username',
                component: InstructorComponent
            }
        ]
    }
];
