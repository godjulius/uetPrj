import {Component, ElementRef, ViewChild} from '@angular/core';
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
    @ViewChild('mainContent') mainContent!: ElementRef<HTMLDivElement>;

    ngAfterViewInit() {
        this.mainContent.nativeElement.onscroll = (event: any) => {
            // console.log(event);
            if(event.target.scrollTop > 48) {
                document.getElementById('app-header')?.classList.add('demo-top-bar-sticky');
            } else {
                document.getElementById('app-header')?.classList.remove('demo-top-bar-sticky');
            }
        };
    }
}
