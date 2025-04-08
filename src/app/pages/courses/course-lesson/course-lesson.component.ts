import { Component } from '@angular/core';
import {LandingFooterComponent} from '../../landing/landing-footer/landing-footer.component';
import {TabsModule} from 'primeng/tabs';
import {CourseContentComponent} from '../course-content/course-content.component';

@Component({
  selector: 'app-course-lesson',
  standalone: true,
    imports: [
        LandingFooterComponent,
        TabsModule,
        CourseContentComponent
    ],
  templateUrl: './course-lesson.component.html',
  styleUrl: './course-lesson.component.css'
})
export class CourseLessonComponent {
    activeIndex = '0';
}
