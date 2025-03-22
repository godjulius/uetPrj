import {Component} from '@angular/core';
import {BaseComponent} from '../../../core/base.component';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {LandingHeaderComponent} from '../landing-header/landing-header.component';
import {LandingFooterComponent} from "../landing-footer/landing-footer.component";

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        AvatarModule, ButtonModule,
        RouterModule, LandingHeaderComponent, LandingFooterComponent

    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
})
export class LandingPageComponent extends BaseComponent{
    constructor(private router: Router) {
        super();
        console.log('Landing page')
    }
}
