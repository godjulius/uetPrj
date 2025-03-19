import {Component, inject, OnInit, signal} from '@angular/core';
import {DataView, DataViewPageEvent} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {Skeleton} from 'primeng/skeleton';
import {ICourse} from '../../courses/courses.model';
import {CoursesService} from '../../courses/courses.service';
import {TooltipModule} from 'primeng/tooltip';
import {Router, RouterLink} from '@angular/router';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';

@Component({
  selector: 'app-user-courses',
  standalone: true,
    imports: [
        DataView,
        ButtonModule,
        CommonModule,
        SelectButton,
        FormsModule,
        Skeleton,
        TooltipModule,
        RouterLink,
        PaginatorModule
    ],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css',
})
export class UserCoursesComponent implements OnInit{
    private courseService = inject(CoursesService);
    private router = inject(Router)
    loading = false;
    layout: ('list' | 'grid') = 'list';
    data = signal<ICourse[]>([] as ICourse[]);
    totalRecords = 100;
    options: ('list' | 'grid')[] = ['list', 'grid'];

    constructor() {}

    ngOnInit() {
        this.data.set(this.courseService.courses.filter(course => {
            return course.id <= 5;
        }));
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

    handleAddCourse() {
        console.log('Add course')
    }

    first: number = 0;

    rows: number = 10;

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
        console.log(event)
    }
}
