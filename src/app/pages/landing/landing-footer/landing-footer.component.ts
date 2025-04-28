import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Button, ButtonLabel} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {CookieStorageService} from '../../../core/services/cookie-storage.service';
import {AuthService} from '../../auth/auth.service';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {USER} from '../../../core/constants/common.const';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
    imports: [
        CommonModule,
        Button,
        ButtonLabel,
        RouterLink,
    ],
  templateUrl: './landing-footer.component.html',
  styleUrl: './landing-footer.component.css'
})
export class LandingFooterComponent {
    authService = inject(AuthService);
    router = inject(Router)
    localStorageService = inject(LocalStorageService)
    isLoggedIn = false;
    isInstructor = false;
    constructor() {
        this.isLoggedIn = this.authService.isLoggedin()
        this.isInstructor = this.localStorageService.getObject(USER)?.isInstructor
    }

    handleRegister() {
        if (this.isLoggedIn) {
            this.router.navigate(['/user/profile'])
        } else {
            this.router.navigate(['/account/register'])
        }
    }
}
