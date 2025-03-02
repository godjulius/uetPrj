import { Component } from '@angular/core';
import {HeaderUtilsComponent} from "../../../layout/header-utils/header-utils.component";
import {Router} from '@angular/router';
import {LayoutService} from '../../../shared/services/layout.service';

@Component({
  selector: 'app-teacher-header',
  standalone: true,
    imports: [
        HeaderUtilsComponent
    ],
  templateUrl: './teacher-header.component.html',
  styleUrl: './teacher-header.component.css'
})
export class TeacherHeaderComponent {
    constructor(private router: Router, private layoutService: LayoutService) {
    }

    toggleSideBar() {
        this.layoutService.toggleSidebar();
    }

    navigateToLandingPage() {
        this.router.navigate(['/']);
    }
}
