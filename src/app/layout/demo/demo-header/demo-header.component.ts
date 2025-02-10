import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {LayoutService} from '../layout.service';

@Component({
  selector: 'app-demo-header',
  standalone: true,
  imports: [
      CommonModule,
      ButtonModule,

  ],
  templateUrl: './demo-header.component.html',
  styleUrl: './demo-header.component.css'
})
export class DemoHeaderComponent {
    isDarkTheme: boolean = false;

    constructor(private layoutService: LayoutService) {

    }

    changeColorTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        if(document.documentElement.classList.contains('my-app-dark')) {
            document.documentElement.classList.remove('my-app-dark');
        } else {
            document.documentElement.classList.add('my-app-dark');
        }
    }

    toggleSideBar() {
        this.layoutService.toggleSidebar();
    }
}
