import { Component } from '@angular/core';
import {CourseHeaderComponent} from '../course-header/course-header.component';
import {CourseLessonComponent} from '../course-lesson/course-lesson.component';
import {DemoSidebarComponent} from '../../../layout/demo/demo-sidebar/demo-sidebar.component';
import {RouterOutlet} from '@angular/router';
import {CourseSideBarComponent} from '../course-side-bar/course-side-bar.component';

@Component({
  selector: 'app-course',
  standalone: true,
    imports: [
        CourseHeaderComponent,
        CourseLessonComponent,
        RouterOutlet,
        CourseSideBarComponent
    ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

}
