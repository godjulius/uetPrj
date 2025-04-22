import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CourseHeaderComponent} from '../course-header/course-header.component';
import {CourseLessonComponent} from '../course-lesson/course-lesson.component';
import {DemoSidebarComponent} from '../../../layout/demo/demo-sidebar/demo-sidebar.component';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {CourseSideBarComponent} from '../course-side-bar/course-side-bar.component';
import {CourseLayoutService} from '../course-layout.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CoursesService} from '../courses.service';
import {finalize} from 'rxjs';
import {BaseComponent} from '../../../core/base.component';

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
export class CourseComponent extends BaseComponent implements OnInit {
    courseLayoutService = inject(CourseLayoutService);
    courseService = inject(CoursesService);
    route = inject(ActivatedRoute)
    courseId: string | undefined = undefined;
    lessonId: string | undefined = undefined;
    courseContents: any;
    course: any;
    loading: boolean = false;
    constructor() {
        super();
        this.route.params
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((params: any) => {
                if (params['courseId'] && params['lessonId']) {
                    this.courseId = params['courseId'];
                    this.lessonId = params['lessonId'];
                    this.courseLayoutService.setLessonId(this.lessonId);
                }
        })
    }

    ngOnInit() {
        this.loading = true;
        this.courseService.getCourseById(this.courseId!).pipe(
            finalize(() => {
                this.loading = false
            }),
            takeUntilDestroyed(this.destroyRef)
        )
            .subscribe((res: any) => {
                if (res) {
                    console.log(res);
                    this.course = res;
                    this.courseContents = res.contents;
                }
            })
    }
}
