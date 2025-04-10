import {Component} from '@angular/core';
import {LandingFooterComponent} from '../../landing/landing-footer/landing-footer.component';
import {TabsModule} from 'primeng/tabs';
import {CourseContentComponent} from '../course-content/course-content.component';
import {CourseReviewsComponent} from '../course-reviews/course-reviews.component';

@Component({
    selector: 'app-course-lesson',
    standalone: true,
    imports: [
        LandingFooterComponent,
        TabsModule,
        CourseContentComponent,
        CourseReviewsComponent
    ],
    templateUrl: './course-lesson.component.html',
    styleUrl: './course-lesson.component.css'
})
export class CourseLessonComponent {
    activeIndex: number = 0;
}
