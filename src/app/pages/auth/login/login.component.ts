import {SessionStorageService} from '../../../core/services/session-storage.service';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BaseComponent} from '../../../core/base.component';
import {TranslatePipe} from '@ngx-translate/core';
import {Message} from 'primeng/message';
import {CardModule} from 'primeng/card';
import {AuthService} from '../auth.service';
import {LoginModel} from '../auth.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize} from 'rxjs';
import {AUTH_TOKEN} from '../../../core/constants/common.const';
import {CookieStorageService} from '../../../core/services/cookie-storage.service';
import {MessageService} from 'primeng/api';
import {
    GoogleSigninButtonModule,
    SocialAuthService
} from '@abacritt/angularx-social-login';

declare var google: any;

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, RouterModule, TranslatePipe, Message, CardModule, GoogleSigninButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent extends BaseComponent implements OnInit {
    authService = inject(AuthService)
    private router = inject(Router);
    sessionStorageService = inject(SessionStorageService)
    cookieService = inject(CookieStorageService)
    messageService = inject(MessageService)
    socialAuthService = inject(SocialAuthService)
    loginForm!: FormGroup;
    loading = false;
    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.googleSignInSubs();
    }


    googleSignInSubs() {
        this.socialAuthService.authState.subscribe((user) => {
            console.log(user);
        });
    }

    login() {
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        const account: LoginModel = {
            username: this.loginForm.value.email,
            password: this.loginForm.value.password
        }
        this.authService.login(account)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((res: any) => {
                if (res) {
                    this.cookieService.setCookie(AUTH_TOKEN, res.access_token, 10);
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Login successfully'});
                    this.router.navigate(['/user/profile']);
                }
            })
    }

    isEmailInvalid(): boolean {
        const emailControl = this.loginForm.get('email');
        return emailControl!.invalid && (emailControl!.dirty || emailControl!.touched);
    }

    isPasswordInvalid(): boolean {
        const passwordControl = this.loginForm.get('password');
        return passwordControl!.invalid && (passwordControl!.dirty || passwordControl!.touched);
    }

    private decodeToken(token: string) {
        return JSON.parse(atob(token.split('.')[1]));
    }
}
