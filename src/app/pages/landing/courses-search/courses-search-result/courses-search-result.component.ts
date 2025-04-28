import {Component, inject, Input, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../landingPage.service';
import {DataView} from 'primeng/dataview';
import {SelectButton} from 'primeng/selectbutton';
import {Skeleton} from 'primeng/skeleton';
import {CoursesService} from '../../../courses/courses.service';
import {ICourse} from '../../../courses/courses.model';
import {FormsModule} from '@angular/forms';
import {ICourseSearchResponse} from '../search.model';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {Router, RouterLink} from '@angular/router';
import {Tooltip} from 'primeng/tooltip';

@Component({
    selector: 'app-courses-search-result',
    standalone: true,
    imports: [ButtonModule, CommonModule, DataView, SelectButton, Skeleton, FormsModule, Paginator, RouterLink, Tooltip],
    templateUrl: './courses-search-result.component.html',
    styleUrl: './courses-search-result.component.css',
    providers: [ProductService]
})
export class CoursesSearchResultComponent implements OnInit, OnChanges {
    @Input() data: ICourseSearchResponse | undefined;
    private router = inject(Router)
    loading = false;
    layout: ('list' | 'grid') = 'list';
    first = 0;
    page = 1;
    rows = 5;
    totalRecords = 0;
    options: ('list' | 'grid')[] = ['list', 'grid'];

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data'] && this.data?.items) {
            this.totalRecords = this.data?.total;
            this.rows = this.data?.size;
            this.page = this.data?.page;
        }
    }

    selectItem(item: ICourse) {
        console.log(item)
        this.router.navigate([`course/${item.id}`]);
    }

    counterArray(n: number): any[] {
        return Array(n);
    }

    toggleLoading() {
        this.loading = !this.loading;
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
        this.page = (event.page ?? 1) + 1;
        // this.getData();
    }
}
