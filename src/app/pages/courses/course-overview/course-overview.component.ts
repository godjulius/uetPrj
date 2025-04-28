import {Component, DestroyRef, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../courses.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ICourse} from '../courses.model';
import {CommonModule} from '@angular/common';
import {EditorReadOnlyComponent} from '../../../shared/components/editor-read-only/editor-read-only.component';
import {Card} from 'primeng/card';
import {ProgressBarModule} from 'primeng/progressbar';
import {FormsModule} from '@angular/forms';
import {LanguageNamePipe} from '../../../shared/pipes/language-name.pipe';
import {DurationFormatPipe} from '../../../shared/pipes/duration.pipe';
import {BaseComponent} from '../../../core/base.component';
import {CapitalizePipe} from '../../../shared/pipes/capitalize.pipe';

@Component({
    selector: 'app-course-overview',
    standalone: true,
    imports: [CommonModule, EditorReadOnlyComponent, Card, ProgressBarModule, FormsModule, LanguageNamePipe, DurationFormatPipe, CapitalizePipe],
    templateUrl: './course-overview.component.html',
    styleUrl: './course-overview.component.css'
})
export class CourseOverviewComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() courseId: string | undefined;
    course: ICourse | null = null;

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) {
        super()
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['courseId'] && changes['courseId'].currentValue) {
            this.courseId = changes['courseId'].currentValue;
            this.coursesService.getCourseById(this.courseId!)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((data: ICourse | null) => {
                    this.course = data;
                    console.log("course", this.course);
                });
        }
    }

    ngOnInit(): void {
    }
}
