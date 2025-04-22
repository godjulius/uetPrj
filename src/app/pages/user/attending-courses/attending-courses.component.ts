import {Component, inject, OnInit, signal} from '@angular/core';
import {DataView} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {Skeleton} from 'primeng/skeleton';
import {ICourse} from '../../courses/courses.model';
import {CoursesService} from '../../courses/courses.service';

@Component({
    selector: 'app-attending-courses',
    standalone: true,
    imports: [
        DataView,
        ButtonModule,
        CommonModule,
        SelectButton,
        FormsModule,
        Skeleton
    ],
    templateUrl: './attending-courses.component.html',
    styleUrl: './attending-courses.component.css'
})
export class AttendingCoursesComponent implements OnInit {
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
