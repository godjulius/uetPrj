import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {IftaLabelModule} from 'primeng/iftalabel';
import {ActivatedRoute} from '@angular/router';
import {CoursesFilterComponent} from './courses-filter/courses-filter.component';
import {CoursesSearchResultComponent} from './courses-search-result/courses-search-result.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BaseComponent} from '../../../core/base.component';
import {CoursesService} from '../../courses/courses.service';
import {ICourseSearchModel, ICourseSearchResponse} from './search.model';
import {ICourse} from '../../courses/courses.model';

@Component({
  selector: 'app-courses-search',
  standalone: true,
    imports: [
        ButtonModule,
        FormsModule, SelectModule, IftaLabelModule, CoursesFilterComponent, CoursesSearchResultComponent
    ],
  templateUrl: './courses-search.component.html',
  styleUrl: './courses-search.component.css'
})
export class CoursesSearchComponent extends BaseComponent implements OnInit {
    courseService = inject(CoursesService)
    filter: ICourseSearchModel = {
        keyword: '',
        filter: {
            category: '',
            level: '',
            language: '',
            rating: '',
            duration: '',
            price: '',
            sort: '',
        },
        page: 1,
        size: 10,
    }
    data: ICourseSearchResponse | undefined
    loading = false
    constructor(private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.route.queryParams
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(params => {
            this.filter.keyword = params['token'] || '';
            this.searchCourses()
        });
    }

    searchCourses() {
        this.loading = true;
        this.courseService.searchCourses(this.filter)
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((res: ICourseSearchResponse) => {
                console.log(res);
                this.data = res;
            })
    }

}
