import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AdminHeaderComponent} from '../admin-header/admin-header.component';
import {AdminSidebarComponent} from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
    imports: [
        RouterOutlet,
        AdminHeaderComponent,
        AdminSidebarComponent
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
