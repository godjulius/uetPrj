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
export class CourseContentComponent implements OnInit{
    course: ICourse | null = null;
    private destroyRef = inject(DestroyRef);
    constructor(private route: ActivatedRoute, private coursesService: CoursesService) {

    }

    ratings = {
        average: 4.2,
        total: 250,
        breakdown: [
            { stars: 5, count: 150 },
            { stars: 4, count: 50 },
            { stars: 3, count: 25 },
            { stars: 2, count: 15 },
            { stars: 1, count: 10 }
        ]
    };

    reviews = [
        {
            initials: 'CW',
            name: 'Christopher W.',
            rating: 2.5,
            timeAgo: 'a month ago',
            content:
                'The course really covers the basics and can get anyone up to speed on Angular with just a few of these classes and syntax used here. I really enjoyed how quick and simple it was laid out and the detail of effort that went into describing and showing various ways of performing the same task.',
        },
        {
            initials: 'AS',
            name: 'Anita S.',
            rating: 5,
            timeAgo: '2 weeks ago',
            content:
                'Absolutely loved this course! The instructor explained everything very clearly, and the examples were easy to follow. Perfect for beginners.',
        },
        {
            initials: 'JT',
            name: 'James T.',
            rating: 3.8,
            timeAgo: '3 months ago',
            content:
                'Good course overall, but some sections felt rushed. I wish there were a few more real-world project examples.',
        },
        {
            initials: 'ML',
            name: 'Maria L.',
            rating: 4.2,
            timeAgo: 'a week ago',
            content:
                'Very informative and engaging. The course structure is great and the content is practical. Would recommend to anyone starting out with Angular.',
        },
    ];

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
