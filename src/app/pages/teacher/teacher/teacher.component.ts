import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TeacherHeaderComponent} from '../teacher-header/teacher-header.component';
import {TeacherSidebarComponent} from '../teacher-sidebar/teacher-sidebar.component';

@Component({
    selector: 'app-teacher',
    standalone: true,
    imports: [
        RouterOutlet,
        TeacherHeaderComponent,
        TeacherSidebarComponent,
    ],
    templateUrl: './teacher.component.html',
    styleUrl: './teacher.component.css'
})
export class TeacherComponent {

}
