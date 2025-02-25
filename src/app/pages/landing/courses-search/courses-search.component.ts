import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {IftaLabelModule} from 'primeng/iftalabel';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-courses-search',
  standalone: true,
    imports: [
        ButtonModule,
        FormsModule, SelectModule, IftaLabelModule
    ],
  templateUrl: './courses-search.component.html',
  styleUrl: './courses-search.component.css'
})
export class CoursesSearchComponent implements OnInit {
    sortBy = {label: 'Most popular', value: 'most_popular'}
    sortValues = [
        {label: 'Newest', value: 'newest'},
        {label: 'Oldest', value: 'oldest'},
        {label: 'Most popular', value: 'most_popular'},
        {label: 'Least popular', value: 'least_pop'}
    ];

    constructor(private route: ActivatedRoute) {
        this.sortBy = {label: 'Most popular', value: 'most_popular'}
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            console.log(params['token']); // Lấy giá trị của key
        });
    }

}
