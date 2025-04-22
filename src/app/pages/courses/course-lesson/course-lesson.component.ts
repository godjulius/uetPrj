import {Component, inject, Input, OnInit} from '@angular/core';
import {LandingFooterComponent} from '../../landing/landing-footer/landing-footer.component';
import {TabsModule} from 'primeng/tabs';
import {CourseContentComponent} from '../course-content/course-content.component';
import {VideoJsComponent} from '../../../shared/components/video-js/video-js.component';
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
        CourseContentComponent,
        VideoJsComponent
    ],
  templateUrl: './course-lesson.component.html',
  styleUrl: './course-lesson.component.css'
})
export class CourseLessonComponent extends BaseComponent implements OnInit {
    @Input({required: true}) lessonId: string | undefined;
    courseLayoutService = inject(CourseLayoutService)
    courseService = inject(CoursesService)
    activeIndex = '0';
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
}
