import {Component, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {RatingsComponent} from './ratings/ratings.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
    imports: [
        Card,
        RatingsComponent,

    ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
    ngOnInit() {
    }
}
