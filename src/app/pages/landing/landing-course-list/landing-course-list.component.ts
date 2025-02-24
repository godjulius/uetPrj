import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Carousel} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {Tag} from 'primeng/tag';
import {ProductService} from '../landingPage.service';
import {Product} from '../landingPage.model';
import {TabsModule} from 'primeng/tabs';
import {Card} from 'primeng/card';

@Component({
    selector: 'app-landing-course-list',
    standalone: true,
    imports: [
        CommonModule,
        Carousel, ButtonModule, Tag,
        TabsModule, Card
    ],
    templateUrl: './landing-course-list.component.html',
    styleUrl: './landing-course-list.component.css',
    providers: [ProductService]
})
export class LandingCourseListComponent implements OnInit {
    products: Product[] | undefined;
    tabs: { title: string; value: number; content: string }[] = [];
    responsiveOptions: any[] | undefined;

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.tabs = [
            { title: 'Data science', value: 0, content: 'Tab 1 Content' },
            { title: 'IT Certifications', value: 1, content: 'Tab 2 Content' },
            { title: 'Web development', value: 2, content: 'Tab 3 Content' },
        ];
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });

        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'success';
        }
    }
}
