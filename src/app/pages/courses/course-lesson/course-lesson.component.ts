import {Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
import {ProgressSpinner} from 'primeng/progressspinner';
import {QuizPlayerComponent} from '../quiz-player/quiz-player.component';
import {Router} from '@angular/router';

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
        CourseNotesComponent,
        ProgressSpinner,
        QuizPlayerComponent
    ],
    templateUrl: './course-lesson.component.html',
    styleUrl: './course-lesson.component.css'
})
export class CourseLessonComponent extends BaseComponent implements OnInit, OnChanges {
    @Input({required: true}) lessonId: string | undefined;
    @Input({required: true}) courseId: string | undefined;
    @ViewChild('videoPlayer') videoComponent!: VideoJsComponent;
    activeIndex = '0';
    courseLayoutService = inject(CourseLayoutService)
    courseService = inject(CoursesService)
    loading: boolean = false;
    lessonContent: any;
    isLesson: boolean = true;

    constructor(private router: Router) {
        super();
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        const currentUrl = this.router.url;
        if (changes['lessonId'] && changes['lessonId'].currentValue) {
            this.loading = true;
            this.lessonContent = null
            if (currentUrl.includes('lesson')) {
                this.isLesson = true;
                this.courseService.getLessonById(this.lessonId!)
                    .pipe(
                        takeUntilDestroyed(this.destroyRef),
                        finalize(() => {
                            this.loading = false
                        })
                    )
                    .subscribe((res: any) => {
                        if (res) {
                            console.log(res);
                            this.lessonContent = res;
                        }
                    })
            } else if (currentUrl.includes('quiz')) {
                this.isLesson = false;
                this.courseService.getQuizById(this.lessonId!)
                    .pipe(
                        takeUntilDestroyed(this.destroyRef),
                        finalize(() => {
                            this.loading = false;
                        })
                    )
                    .subscribe((quizData: any) => {
                        if (quizData) {
                            console.log(quizData);
                            this.lessonContent = quizData;
                        }
                    });
            }
        }
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
