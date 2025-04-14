import {Component, ViewChild} from '@angular/core';
import {LandingFooterComponent} from '../../landing/landing-footer/landing-footer.component';
import {TabsModule} from 'primeng/tabs';
import {CourseContentComponent} from '../course-content/course-content.component';
import {VideoJsComponent} from '../../../shared/components/video-js/video-js.component';
import {CourseReviewsComponent} from '../course-reviews/course-reviews.component';
import {CourseAnnouncementsComponent} from '../course-announcements/course-announcements.component';
import {CourseNotesComponent} from '../course-notes/course-notes.component';

@Component({
    selector: 'app-course-lesson',
    standalone: true,
    imports: [
        LandingFooterComponent,
        TabsModule,
        CourseContentComponent,
        VideoJsComponent,
        CourseReviewsComponent,
        CourseAnnouncementsComponent,
        CourseNotesComponent
    ],
    templateUrl: './course-lesson.component.html',
    styleUrl: './course-lesson.component.css'
})
export class CourseLessonComponent {
    @ViewChild('videoPlayer') videoComponent!: VideoJsComponent;
    activeIndex = '0';

    get currentTime(): number {
        return this.videoComponent?.player?.currentTime?.() ?? 0;
    }

    seekToTime(time: number) {
        this.videoComponent?.player?.currentTime(time);
    }

    pauseVideo() {
        this.videoComponent?.player?.pause?.();
    }
}
