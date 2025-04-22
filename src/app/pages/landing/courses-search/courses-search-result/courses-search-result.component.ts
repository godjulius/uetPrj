import {Component, inject, OnInit, signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../landingPage.service';
import {DataView} from 'primeng/dataview';
import {SelectButton} from 'primeng/selectbutton';
import {Skeleton} from 'primeng/skeleton';
import {CoursesService} from '../../../courses/courses.service';
import {ICourse} from '../../../courses/courses.model';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-courses-search-result',
    standalone: true,
    imports: [ButtonModule, CommonModule, DataView, SelectButton, Skeleton, FormsModule],
    templateUrl: './courses-search-result.component.html',
    styleUrl: './courses-search-result.component.css',
    providers: [ProductService]
})
export class CoursesSearchResultComponent implements OnInit {
    private courseService = inject(CoursesService);
    loading = false;
    layout: ('list' | 'grid') = 'list';
    data = signal<ICourse[]>([] as ICourse[]);

    options: ('list' | 'grid')[] = ['list', 'grid'];

    constructor() {
    }

    ngOnInit() {
    }

    selectItem(item: any) {
        console.log(item)
    }

    counterArray(n: number): any[] {
        return Array(n);
    }

    toggleLoading() {
        this.loading = !this.loading;
    }
}
