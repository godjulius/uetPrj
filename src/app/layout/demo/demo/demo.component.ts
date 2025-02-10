import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoHeaderComponent} from '../demo-header/demo-header.component';
import {DemoSidebarComponent} from '../demo-sidebar/demo-sidebar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-demo',
  standalone: true,
    imports: [
        CommonModule,
        DemoHeaderComponent,
        DemoSidebarComponent,
        RouterOutlet,
    ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
}
