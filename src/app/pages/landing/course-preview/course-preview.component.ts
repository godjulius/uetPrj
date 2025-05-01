import {Component, DestroyRef, HostListener, inject, OnInit, signal} from '@angular/core';
import {ICourse} from '../../courses/courses.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursesService} from '../../courses/courses.service';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {Button, ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LanguageNamePipe} from '../../../shared/pipes/language-name.pipe';
import {EditorReadOnlyComponent} from '../../../shared/components/editor-read-only/editor-read-only.component';
import {DurationFormatPipe} from '../../../shared/pipes/duration.pipe';
import {CapitalizePipe} from '../../../shared/pipes/capitalize.pipe';
import {BaseComponent} from '../../../core/base.component';
import {finalize, first} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-course-preview',
    standalone: true,
    imports: [
        CommonModule, CardModule, ButtonDirective, Ripple, Accordion, AccordionPanel,
        AccordionHeader, AccordionContent, LanguageNamePipe, EditorReadOnlyComponent, Button, DurationFormatPipe, CapitalizePipe
    ],
    templateUrl: './course-preview.component.html',
    styleUrl: './course-preview.component.css'
})
export class CoursePreviewComponent extends BaseComponent implements OnInit {
    router = inject(Router);
    authService = inject(AuthService)
    courseService = inject(CoursesService);
    loading = false
    course: ICourse | null = null;
    isSticky = false; // Biến kiểm tra trạng thái sticky
    attendingCourses = signal<ICourse[]>([] as ICourse[]);
    isAttended = false;
    constructor(private route: ActivatedRoute, private coursesService: CoursesService) {
        super()
    }

    ngOnInit(): void {
        this.coursesService.getCourseById(this.route.snapshot.params['id'])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data: ICourse | null) => {
                this.course = data;
                console.log("course", this.course);
            });
        this.getAttendingCourses()
    }

    formatDuration(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${this.pad(mins)}:${this.pad(secs)}`;
    }

    private pad(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }

    getTotalDuration(lessons: any[]): string {
        let totalSeconds = 0;

        lessons.forEach(lesson => {
            totalSeconds += lesson.lesson?.duration || 0;
        });

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        return hours > 0 ? `${hours}hr ${minutes}min` : `${minutes}min`;
    }

    getTotalContent(): { totalSections: number; totalLessons: number; totalDuration: string } {
        if (!this.course?.contents) return {totalSections: 0, totalLessons: 0, totalDuration: '0m'};

        let totalSections = this.course.contents.length;
        let totalLessons = 0;
        let totalSeconds = 0;

        this.course.contents.forEach(section => {
            totalLessons += section.sectionContents.length;
            section.sectionContents.forEach(lesson => {
                totalSeconds += lesson.lesson?.duration || 0
            });
        });

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const totalDuration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m ${seconds}s`;

        return {totalSections, totalLessons, totalDuration};
    }


    @HostListener('window:scroll', [])
    onScroll(): void {
        const scrollY = window.scrollY;
        const triggerPoint = window.innerHeight * 0.4 + 40;
        this.isSticky = scrollY > triggerPoint;
    }

    @HostListener('window:resize', [])
    onResize(): void {
        this.calculateWidth();
    }

    calculateWidth(): string {
        if (window.innerWidth >= 1280) return `calc((100vw - 416px - 64px) / 3)`;
        if (window.innerWidth >= 1024) return `calc((100vw - 160px - 64px) / 3)`;
        return `calc((100vw - 64px - 64px) / 3)`;
    }

    addToCart(): void {
        if (this.course) {
            console.log(`Đã thêm khóa học "${this.course.title}" vào giỏ hàng!`);
        }
    }

    handleRegisterCourse() {
        console.log(this.course)
        this.loading = true;
        if (this.course?.id) {
            this.coursesService.registerCourse(this.course.id)
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    finalize(() => {
                        this.loading = false;
                    })
                )
                .subscribe((course: ICourse) => {
                    let firstLessonId: string = '';
                    if (course.contents[0].sectionContents[0].lesson?.id) {
                        firstLessonId = course.contents[0].sectionContents[0].lesson?.id;
                    } else if (course.contents[0].sectionContents[0].quiz?.id) {
                        firstLessonId = course.contents[0].sectionContents[0].quiz?.id;
                    }
                    this.router.navigate(['/course', this.course?.id, 'lesson', firstLessonId])
                })
        }
    }

    getAttendingCourses() {
        if (this.authService.isLoggedin()) {

        this.loading = true;
        this.courseService.getAttendingCourses()
            .pipe(
                first(),
                finalize(() => {
                    this.loading = false
                })
            )
            .subscribe((data: any) => {
                this.attendingCourses.set(data.items);
                this.checkAttendingCourse()
                console.log(this.attendingCourses())
                console.log(this.isAttended)
            });
        }
    }

    checkAttendingCourse() {
        const courseId: string = this.route.snapshot.params['id'];
        this.isAttended = this.attendingCourses().findIndex((course: ICourse) => {
            return course.id === courseId;
        }) !== -1;
    }

    handleEnterLearningPage() {
        this.router.navigate([`/course/${this.course?.id}/lesson/${this.course?.contents[0].sectionContents[0].lesson?.id}`]);
    }
}
