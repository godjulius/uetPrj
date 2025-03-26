import {Component, DestroyRef, HostListener, inject, OnInit} from '@angular/core';
import {ICourse} from '../../courses/courses.model';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../../courses/courses.service';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-course-preview',
  standalone: true,
    imports: [
        CommonModule, CardModule, ButtonDirective, Ripple, Accordion, AccordionPanel,
        AccordionHeader, AccordionContent
    ],
  templateUrl: './course-preview.component.html',
  styleUrl: './course-preview.component.css'
})
export class CoursePreviewComponent implements OnInit {
    course: ICourse | null = null;
    private destroyRef = inject(DestroyRef); // Inject DestroyRef
    isSticky = false; // Biến kiểm tra trạng thái sticky

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

    ngOnInit(): void {
        const index = Number(this.route.snapshot.paramMap.get('id')); // Chuyển id thành số
        console.log('index', index);

        if (!isNaN(index)) {
            this.coursesService.getCourseById1(index)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((data: ICourse | null) => {
                this.course = data;
                console.log("course", this.course);
            });
        }
    }

    getTotalDuration(lessons: { duration: string }[]): string {
        let totalMinutes = 0;

        lessons.forEach(lesson => {
            const match = lesson.duration.match(/(\d+)m/); // Lấy số phút
            if (match) {
                totalMinutes += parseInt(match[1], 10);
            }
        });

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }

    @HostListener('window:scroll', [])
    onScroll(): void {
        const scrollY = window.scrollY;
        const triggerPoint = window.innerHeight * 0.4 + 40; // Điểm khi cuộn qua nền đen (~40% viewport)
        this.isSticky = scrollY > triggerPoint;
    }

    calculateWidth(): string {
        if (window.innerWidth >= 1280) return `calc((100vw - 416px - 64px) / 3)`;
        if (window.innerWidth >= 1024) return `calc((100vw - 160px - 64px) / 3)`;
        return `calc((100vw - 64px - 64px) / 3)`;
    }

    addToCart(): void {
        if (this.course) {
            console.log(`Đã thêm khóa học "${this.course.name}" vào giỏ hàng!`);
        }
    }
}
