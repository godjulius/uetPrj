import {Component, inject, OnInit, signal} from '@angular/core';
import {DataView} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {Skeleton} from 'primeng/skeleton';
import {ICourse} from '../../courses/courses.model';
import {CoursesService} from '../../courses/courses.service';
import {finalize, first} from 'rxjs';
import {Router, RouterLink} from '@angular/router';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {Tooltip} from 'primeng/tooltip';

@Component({
    selector: 'app-attending-courses',
    standalone: true,
    imports: [
        DataView,
        ButtonModule,
        CommonModule,
        SelectButton,
        FormsModule,
        Skeleton,
        Paginator,
        RouterLink,
        Tooltip
    ],
    templateUrl: './attending-courses.component.html',
    styleUrl: './attending-courses.component.css'
})
export class AttendingCoursesComponent implements OnInit {
    private courseService = inject(CoursesService);
    private router = inject(Router)
    loading = false;
    layout: ('list' | 'grid') = 'list';
    first = 0;
    page = 1;
    rows = 5;
    totalRecords = 0;
    data = signal<ICourse[]>([] as ICourse[]);
    options: ('list' | 'grid')[] = ['list', 'grid'];

    constructor() {
    }

    ngOnInit() {
        this.getData()
    }

    getData() {
        this.loading = true;
        this.courseService.getAttendingCourses()
            .pipe(
                first(),
                finalize(() => {
                    this.loading = false
                })
            )
            .subscribe((data: any) => {
                this.data.set(data.items);
                console.log(this.data())
                this.totalRecords = data.total;
        });
    }

    selectItem(item: ICourse) {
        console.log(item)
        this.router.navigate([`/course/${item.id}/lesson/${item.contents[0].sectionContents[0].lesson?.id}`]);
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
        this.getData();
    }
}
