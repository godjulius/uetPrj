import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {IftaLabel} from "primeng/iftalabel";
import {Select} from "primeng/select";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-courses-filter',
  standalone: true,
    imports: [
        Button,
        IftaLabel,
        Select,
        FormsModule
    ],
  templateUrl: './courses-filter.component.html',
  styleUrl: './courses-filter.component.css'
})
export class CoursesFilterComponent {
    sortBy = {label: 'Most popular', value: 'most_popular'}
    sortValues = [
        {label: 'Newest', value: 'newest'},
        {label: 'Oldest', value: 'oldest'},
        {label: 'Most popular', value: 'most_popular'},
        {label: 'Least popular', value: 'least_pop'}
    ];
}
