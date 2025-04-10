import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CustomRatingComponent} from "../../../shared/components/custom-rating/custom-rating.component";
import {CommonModule, DecimalPipe} from "@angular/common";
import {ProgressBar} from "primeng/progressbar";
import {Rating} from "primeng/rating";
import {ICourse} from '../courses.model';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../courses.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';

@Component({
    selector: 'app-course-reviews',
    standalone: true,
    imports: [
        CustomRatingComponent, DecimalPipe, CommonModule, ProgressBar, Rating, FormsModule, SelectModule,
    ],
    templateUrl: './course-reviews.component.html',
    styleUrl: './course-reviews.component.css'
})
export class CourseReviewsComponent implements OnInit {
    course: ICourse | null = null;
    private destroyRef = inject(DestroyRef);

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) {

    }

    selectedRatingFilter: number | null = null;

    ratingFilterOptions = [
        {label: 'All Ratings', value: null},
        {label: '5 Stars', value: 5},
        {label: '4 Stars', value: 4},
        {label: '3 Stars', value: 3},
        {label: '2 Stars', value: 2},
        {label: '1 Star', value: 1},
    ];

    filteredReviews: any = [];

    ratings = {
        average: 4.2,
        total: 250,
        breakdown: [
            {stars: 5, count: 150},
            {stars: 4, count: 50},
            {stars: 3, count: 25},
            {stars: 2, count: 15},
            {stars: 1, count: 10}
        ]
    };

    toggleLike(review: any) {
        review.liked = !review.liked;
        if (review.liked) {
            review.disliked = false;
        }
    }

    toggleDislike(review: any) {
        review.disliked = !review.disliked;
        if (review.disliked) {
            review.liked = false;
        }
    }

    reviews = [
        {
            initials: 'CW',
            name: 'Christopher W.',
            rating: 2,
            timeAgo: 'a month ago',
            content:
                'The course really covers the basics and can get anyone up to speed on Angular with just a few of these classes and syntax used here. I really enjoyed how quick and simple it was laid out and the detail of effort that went into describing and showing various ways of performing the same task.',
            liked: false,
            disliked: false
        },
        {
            initials: 'AS',
            name: 'Anita S.',
            rating: 5,
            timeAgo: '2 weeks ago',
            content:
                'Absolutely loved this course! The instructor explained everything very clearly, and the examples were easy to follow. Perfect for beginners.',
            liked: false,
            disliked: false
        },
        {
            initials: 'JT',
            name: 'James T.',
            rating: 3,
            timeAgo: '3 months ago',
            content:
                'Good course overall, but some sections felt rushed. I wish there were a few more real-world project examples.',
            liked: false,
            disliked: false
        },
        {
            initials: 'ML',
            name: 'Maria L.',
            rating: 4,
            timeAgo: 'a week ago',
            content:
                'Very informative and engaging. The course structure is great and the content is practical. Would recommend to anyone starting out with Angular.',
            liked: false,
            disliked: false
        },
        {
            initials: 'DT',
            name: 'Daniel T.',
            rating: 5,
            timeAgo: '5 days ago',
            content:
                'Super helpful and well-explained content. The visuals were clean and the code examples were up to date. Great job!',
            liked: false,
            disliked: false
        },
        {
            initials: 'KB',
            name: 'Kimberly B.',
            rating: 3,
            timeAgo: '2 months ago',
            content:
                'The course was okay but lacked interactive exercises. More hands-on projects would improve the learning experience.',
            liked: false,
            disliked: false
        },
        {
            initials: 'RL',
            name: 'Richard L.',
            rating: 4,
            timeAgo: '3 weeks ago',
            content:
                'Nice course with a great flow. Some parts were too basic for me, but still a good refresher on Angular fundamentals.',
            liked: false,
            disliked: false
        },
        {
            initials: 'RL',
            name: 'Richard L.',
            rating: 1,
            timeAgo: '3 weeks ago',
            content:
                'Nice course with a great flow. Some parts were too basic for me, but still a good refresher on Angular fundamentals.',
            liked: false,
            disliked: false
        }
    ];


    ngOnInit(): void {
        this.filteredReviews = this.reviews;

        const index = 1;

        this.coursesService.getCourseById1(index)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data: ICourse | null) => {
                this.course = data;
                console.log("course", this.course);
            });

    }

    filterReviews() {
        if (!this.selectedRatingFilter) {
            this.filteredReviews = this.reviews;
        } else {
            const rating = this.selectedRatingFilter;
            this.filteredReviews = this.reviews.filter(review => review.rating === rating.valueOf());
        }
    }

}
