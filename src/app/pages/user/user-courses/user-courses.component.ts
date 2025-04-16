import {Component, inject, OnInit, signal} from '@angular/core';
import {DataView} from 'primeng/dataview';
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
import {BaseComponent} from '../../../core/base.component';
import {finalize} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
export class UserCoursesComponent extends BaseComponent implements OnInit {
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
        super()
    }

    ngOnInit() {
        this.data.set(this.courseService.courses.filter(course => {
            return (course.id || 0) <= 5;
        }));
        this.getData()
    }

    getData() {
        this.loading = true;
        this.courseService.getCourses(this.page, this.rows)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((res: any) => {
                if (res) {
                    this.data.set(res.items);
                    console.log(this.data())
                    this.totalRecords = res.total;
                }
            });
    }

    selectItem(item: any) {
        console.log(item)
        this.router.navigate([`/user/user-courses/${item.id}`]);
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
