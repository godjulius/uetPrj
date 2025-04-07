import { Component } from '@angular/core';
import {LandingFooterComponent} from '../../landing/landing-footer/landing-footer.component';
import {TabsModule} from 'primeng/tabs';

@Component({
  selector: 'app-course-lesson',
  standalone: true,
    imports: [
        LandingFooterComponent,
        TabsModule
    ],
  templateUrl: './course-lesson.component.html',
  styleUrl: './course-lesson.component.css'
})
export class CourseLessonComponent {

}
