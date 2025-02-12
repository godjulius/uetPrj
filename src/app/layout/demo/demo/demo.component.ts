import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
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
export class DemoComponent{
    // @ViewChild('mainContent') mainContent!: ElementRef<HTMLDivElement>;
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if(window.scrollY > 48) {
            document.getElementById('app-header')?.classList.add('demo-top-bar-sticky');
        } else {
            document.getElementById('app-header')?.classList.remove('demo-top-bar-sticky');
        }
    }
}
