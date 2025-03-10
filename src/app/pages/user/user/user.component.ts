import {Component, HostListener} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UserHeaderComponent} from '../user-header/user-header.component';
import {UserSidebarComponent} from '../user-sidebar/user-sidebar.component';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        RouterOutlet,
        UserHeaderComponent,
        UserSidebarComponent,
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})
export class UserComponent {
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if(window.scrollY > 48) {
            document.getElementById('app-header')?.classList.add('dashboard-top-bar-sticky');
        } else {
            document.getElementById('app-header')?.classList.remove('dashboard-top-bar-sticky');
        }
    }
}
