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
        TooltipModule
    ],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css',
})
export class UserCoursesComponent implements OnInit{
    private courseService = inject(CoursesService);
    loading = false;
    layout: ('list' | 'grid') = 'list';
    data = signal<ICourse[]>([] as ICourse[]);

    options: ('list' | 'grid')[] = ['list', 'grid'];

    constructor() {}

    ngOnInit() {
        this.data.set(this.courseService.courses);
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
