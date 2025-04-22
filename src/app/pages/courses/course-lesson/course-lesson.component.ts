import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {LandingFooterComponent} from '../../landing/landing-footer/landing-footer.component';
import {TabsModule} from 'primeng/tabs';
import {CourseOverviewComponent} from '../course-overview/course-overview.component';
import {VideoJsComponent} from '../../../shared/components/video-js/video-js.component';
import {CourseReviewsComponent} from '../course-reviews/course-reviews.component';
import {CourseAnnouncementsComponent} from '../course-announcements/course-announcements.component';
import {CourseNotesComponent} from '../course-notes/course-notes.component';
import {CourseLayoutService} from '../course-layout.service';
import {CoursesService} from '../courses.service';
import {BaseComponent} from '../../../core/base.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize} from 'rxjs';

@Component({
    selector: 'app-course-lesson',
    standalone: true,
    imports: [
        LandingFooterComponent,
        TabsModule,
        CourseOverviewComponent,
        VideoJsComponent,
        CourseReviewsComponent,
        CourseAnnouncementsComponent,
        CourseNotesComponent
    ],
    templateUrl: './course-lesson.component.html',
    styleUrl: './course-lesson.component.css'
})
export class CourseLessonComponent extends BaseComponent implements OnInit {
    @Input({required: true}) lessonId: string | undefined;
    @Input({required: true}) courseId: string | undefined;
    @ViewChild('videoPlayer') videoComponent!: VideoJsComponent;
    activeIndex = '0';
    courseLayoutService = inject(CourseLayoutService)
    courseService = inject(CoursesService)
    loading: boolean = false;
    lessonContent: any;
    constructor() {
        super();
    }

    ngOnInit() {
        // Todo:
        this.loading = true;
        this.courseService.getLessonById(this.lessonId!)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => {
                    this.loading = false
                })
            )
            .subscribe((res: any) => {
                if(res) {
                    console.log('course lesson');
                    console.log(res);
                    this.lessonContent = res;
                }
            })

    }


    handleOpenSidebar() {
        this.courseLayoutService.openSideBar();
    }

    get currentTime(): number {
        return this.videoComponent?.player?.currentTime?.() ?? 0;
    }

    seekToTime(time: number) {
        this.videoComponent?.player?.currentTime(time);
    }

    pauseVideo() {
        this.videoComponent?.player?.pause?.();
    }

    resumeVideo() {
        this.videoComponent?.player?.play?.();
    }
}
