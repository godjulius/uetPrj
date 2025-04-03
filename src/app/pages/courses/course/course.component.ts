import { Component } from '@angular/core';
import {CourseHeaderComponent} from '../course-header/course-header.component';
import {CourseLessonComponent} from '../course-lesson/course-lesson.component';

@Component({
  selector: 'app-course',
  standalone: true,
    imports: [
        CourseHeaderComponent,
        CourseLessonComponent
    ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

}
