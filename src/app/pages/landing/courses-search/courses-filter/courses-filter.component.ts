import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {IftaLabel} from "primeng/iftalabel";
import {Select} from "primeng/select";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Slider} from 'primeng/slider';
import {DatePickerModule} from 'primeng/datepicker';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'app-courses-filter',
  standalone: true,
    imports: [
        Button,
        IftaLabel,
        Select,
        FormsModule,
        ReactiveFormsModule,
        Slider,
        DatePickerModule,
        InputNumber
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
    languages = [
        {name: 'English', value: 'en'},
        {name: 'Vietnamese', value: 'vi'},
    ];
    levels = [
        {name: 'Beginner', value: 'beginner'},
        {name: 'Intermediate', value: 'intermediate'},
        {name: 'Advanced', value: 'advanced'},
    ];
    rangeValues: number[] = [0, 1000];
    duration: number | undefined;
}
