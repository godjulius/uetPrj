import {ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-ratings',
    standalone: true,
    imports: [
        ChartModule
    ],
    templateUrl: './ratings.component.html',
    styleUrl: './ratings.component.css'
})
export class RatingsComponent implements OnInit {
    data: any;

    options: any;

    platformId = inject(PLATFORM_ID);

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');

            this.data = {
                labels: ['1⭐', '2⭐', '3⭐', '4⭐', '5⭐'],
                datasets: [
                    {
                        data: [1, 1, 1, 2, 5],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--p-gray-500'),
                            documentStyle.getPropertyValue('--p-orange-500'),
                            documentStyle.getPropertyValue('--p-cyan-500'),
                            documentStyle.getPropertyValue('--p-lime-500'),
                            documentStyle.getPropertyValue('--p-green-500'),
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--p-gray-400'),
                            documentStyle.getPropertyValue('--p-orange-400'),
                            documentStyle.getPropertyValue('--p-cyan-400'),
                            documentStyle.getPropertyValue('--p-lime-400'),
                            documentStyle.getPropertyValue('--p-green-400'),
                        ]
                    }
                ]
            };

            this.options = {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: documentStyle.getPropertyValue('--p-primary-500')
                        }
                    }
                }
            };
            // this.cd.markForCheck()
        }
    }
}
