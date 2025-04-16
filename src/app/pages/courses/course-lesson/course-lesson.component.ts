import {Component, inject} from '@angular/core';
import {LandingFooterComponent} from '../../landing/landing-footer/landing-footer.component';
import {TabsModule} from 'primeng/tabs';
import {CourseContentComponent} from '../course-content/course-content.component';
import {VideoJsComponent} from '../../../shared/components/video-js/video-js.component';
import {CourseLayoutService} from '../course-layout.service';

@Component({
  selector: 'app-course-lesson',
  standalone: true,
    imports: [
        LandingFooterComponent,
        TabsModule,
        CourseContentComponent,
        VideoJsComponent
    ],
  templateUrl: './course-lesson.component.html',
  styleUrl: './course-lesson.component.css'
})
export class CourseLessonComponent {
    activeIndex = '0';
    courseLayoutService = inject(CourseLayoutService)
    handleOpenSidebar() {
        this.courseLayoutService.openSideBar();
    }
}
