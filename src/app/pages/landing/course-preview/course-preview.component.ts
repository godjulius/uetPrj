import {Component, DestroyRef, HostListener, inject, OnInit} from '@angular/core';
import {ICourse} from '../../courses/courses.model';
import {ActivatedRoute} from '@angular/router';
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

@Component({
    selector: 'app-course-preview',
    standalone: true,
    imports: [
        CommonModule, CardModule, ButtonDirective, Ripple, Accordion, AccordionPanel,
        AccordionHeader, AccordionContent, LanguageNamePipe, EditorReadOnlyComponent, Button, DurationFormatPipe
    ],
    templateUrl: './course-preview.component.html',
    styleUrl: './course-preview.component.css'
})
export class CoursePreviewComponent implements OnInit {
    course: ICourse | null = null;
    private destroyRef = inject(DestroyRef); // Inject DestroyRef
    isSticky = false; // Biến kiểm tra trạng thái sticky

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) {
    }

    ngOnInit(): void {
        this.coursesService.getCourseById(this.route.snapshot.params['id'])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data: ICourse | null) => {
                this.course = data;
                console.log("course", this.course);
            });
    }

    getTotalDuration(lessons: any[]): string {
        let totalMinutes = 0;

        lessons.forEach(lesson => {
            totalMinutes += lesson.duration || 0;
        });

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }

    getTotalContent(): { totalSections: number; totalLessons: number; totalDuration: string } {
        if (!this.course?.contents) return {totalSections: 0, totalLessons: 0, totalDuration: '0m'};

        let totalSections = this.course.contents.length;
        let totalLessons = 0;
        let totalMinutes = 0;

        this.course.contents.forEach(section => {
            totalLessons += section.lessons.length;
            section.lessons.forEach(lesson => {
                totalMinutes += lesson.duration || 0
            });
        });

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const totalDuration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

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
}
