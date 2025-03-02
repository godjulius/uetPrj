import {SessionStorageService} from '../../../core/services/session-storage.service';
declare var google: any;
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BaseComponent} from '../../../core/base.component';
import {TranslatePipe} from '@ngx-translate/core';
import {Message} from 'primeng/message';
import {CardModule} from 'primeng/card';
import {AuthService} from '../auth.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, RouterModule, TranslatePipe, Message, CardModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [MessageService]
})
export class LoginComponent extends BaseComponent implements OnInit {
    loginForm!: FormGroup;
    authService = inject(AuthService)
    sessionStorageService = inject(SessionStorageService)
    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.renderGoogleSignInButton();
    }

    renderGoogleSignInButton() {
        google.accounts.id.initialize({
            client_id: environment['google_oauth2'],
            callback: (res: any) => this.signInGoogle(res)
        })
        google.accounts.id.renderButton(document.getElementById('google-signIn-btn') ,{
                theme: 'outline',
                size: 'large',
                shape: 'rectangle',
            });
    }

    login() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            console.log('Form is invalid');
        }
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

    signInGoogle(res: any) {
        if(res) {
            console.log(res)
            const resPayload = this.decodeToken(res.credential);
            this.sessionStorageService.set('googleUser', resPayload);
            console.log(resPayload);
        }
    }
}
