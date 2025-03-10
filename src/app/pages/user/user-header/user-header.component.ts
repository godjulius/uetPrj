import { Component } from '@angular/core';
import {HeaderUtilsComponent} from "../../../layout/header-utils/header-utils.component";
import {Router} from '@angular/router';
import {LayoutService} from '../../../shared/services/layout.service';

@Component({
  selector: 'app-user-header',
  standalone: true,
    imports: [
        HeaderUtilsComponent
    ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
    constructor(private router: Router, private layoutService: LayoutService) {
    }

    toggleSideBar() {
        this.layoutService.toggleSidebar();
    }

    navigateToLandingPage() {
        this.router.navigate(['/']);
    }
}
