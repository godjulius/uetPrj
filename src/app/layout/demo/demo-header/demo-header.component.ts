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
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(e: any) {
        this.isStickyHeader = e.target.scrollY >= 48;
        console.log(this.isStickyHeader)
    }
    isStickyHeader = false;
    isDarkTheme: boolean = false;

    constructor(private layoutService: LayoutService) {
        this.checkDarkTheme();
    }

    checkDarkTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            this.isDarkTheme = true;
        }
    }

    changeColorTheme() {
        if(document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            this.isDarkTheme = false;
        } else {
            document.documentElement.classList.add('dark');
            this.isDarkTheme = true;
        }
    }

    toggleSideBar() {
        this.layoutService.toggleSidebar();
    }
}
