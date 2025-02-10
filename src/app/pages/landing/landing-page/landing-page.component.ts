import {Component} from '@angular/core';
import {BaseComponent} from '../../../core/base.component';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Toolbar} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        Toolbar, AvatarModule, ButtonModule,
        RouterModule

    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
})
export class LandingPageComponent extends BaseComponent{
    constructor(private router: Router) {
        super();
        console.log('Landing page')
    }

    handleLogin() {
        this.router.navigate(['account']);
    }

    navigateToDemo() {
        this.router.navigate(['demo']);
    }
}
