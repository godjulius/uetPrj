import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {IftaLabelModule} from 'primeng/iftalabel';
import {ActivatedRoute} from '@angular/router';
import {CoursesFilterComponent} from './courses-filter/courses-filter.component';
import {CoursesSearchResultComponent} from './courses-search-result/courses-search-result.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BaseComponent} from '../../../core/base.component';

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
    token: string = '';
    constructor(private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.route.queryParams
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(params => {
            this.token = params['token'];
        });
    }

}
