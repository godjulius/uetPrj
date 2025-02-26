import {Component, OnInit, signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Tag} from 'primeng/tag';
import {CommonModule} from '@angular/common';
import {Product} from '../../landingPage.model';
import {ProductService} from '../../landingPage.service';
import {DataView} from 'primeng/dataview';

@Component({
  selector: 'app-courses-search-result',
  standalone: true,
    imports: [DataView, ButtonModule, Tag, CommonModule],
  templateUrl: './courses-search-result.component.html',
  styleUrl: './courses-search-result.component.css',
    providers: [ProductService]
})
export class CoursesSearchResultComponent implements OnInit {
    products = signal<any>([]);

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then(data => {
            this.products.set(data)
            console.log(data)
        });
    }

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return undefined;
        }
    };
}
