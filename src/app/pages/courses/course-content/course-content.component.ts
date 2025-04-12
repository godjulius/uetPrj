import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../courses.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ICourse} from '../courses.model';
import {CommonModule} from '@angular/common';
import {EditorReadOnlyComponent} from '../../../shared/components/editor-read-only/editor-read-only.component';
import {Card} from 'primeng/card';
import {ProgressBarModule} from 'primeng/progressbar';
import {FormsModule} from '@angular/forms';
import {CustomRatingComponent} from '../../../shared/components/custom-rating/custom-rating.component';

@Component({
    selector: 'app-course-content',
    standalone: true,
    imports: [CommonModule, EditorReadOnlyComponent, Card, ProgressBarModule, FormsModule],
    templateUrl: './course-content.component.html',
    styleUrl: './course-content.component.css'
})
export class CourseContentComponent implements OnInit {
    course: ICourse | null = null;
    private destroyRef = inject(DestroyRef);

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) {

    }

    ngOnInit(): void {
        const index = 1;

        this.coursesService.getCourseById1(index)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data: ICourse | null) => {
                this.course = data;
                console.log("course", this.course);
            });

    }
}
