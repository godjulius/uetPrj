import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-custom-rating',
  standalone: true,
    imports: [
        CommonModule
    ],
  templateUrl: './custom-rating.component.html',
  styleUrl: './custom-rating.component.css'
})
export class CustomRatingComponent {
    @Input() rating: number = 0;

    getStarFillWidth(starIndex: number): string {
        const diff = this.rating - (starIndex - 1);
        if (diff >= 1) return '100%';
        if (diff > 0) return `${diff * 100}%`;
        return '0%';
    }

    get stars(): number[] {
        return [1, 2, 3, 4, 5];
    }
}
