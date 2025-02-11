import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {LayoutService} from '../layout.service';
import {HeaderUtilsComponent} from '../../header-utils/header-utils.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-demo-header',
  standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        HeaderUtilsComponent,

    ],
  templateUrl: './demo-header.component.html',
  styleUrl: './demo-header.component.css'
})
export class DemoHeaderComponent {

    constructor(private layoutService: LayoutService, private router: Router) {

    }



    toggleSideBar() {
        this.layoutService.toggleSidebar();
    }

    navigateToLandingPage() {
        this.router.navigate(['/']);
    }
}
