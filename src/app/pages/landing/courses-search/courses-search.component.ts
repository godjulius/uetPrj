import { Component } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {IftaLabelModule} from 'primeng/iftalabel';

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
export class CoursesSearchComponent {
    sortBy = {label: 'Most popular', value: 'most_popular'}
    sortValues = [
        {label: 'Newest', value: 'newest'},
        {label: 'Oldest', value: 'oldest'},
        {label: 'Most popular', value: 'most_popular'},
        {label: 'Least popular', value: 'least_pop'}
    ];

    constructor() {
        this.sortBy = {label: 'Most popular', value: 'most_popular'}
    }
}
