import {Component, OnInit} from '@angular/core';
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

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
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
}
