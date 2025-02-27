import { Component } from '@angular/core';
import {HeaderUtilsComponent} from '../../../layout/header-utils/header-utils.component';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';
import {LayoutService} from '../../../shared/services/layout.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        HeaderUtilsComponent,

    ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

    constructor(private router: Router, private layoutService: LayoutService) {
    }

    toggleSideBar() {
        this.layoutService.toggleSidebar();
    }

    navigateToLandingPage() {
        this.router.navigate(['/']);
    }
}
