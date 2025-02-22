import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {BaseComponent} from '../../../core/base.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [CommonModule, Button, Card, InputText, Message, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseComponent implements OnInit{
    registerForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validators: passwordMatchValidator()
        });
    }

    register() {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
        } else {
            console.log(this.registerForm.get('confirmPassword')?.errors);
            console.log('Form is invalid');
        }
    }

    isEmailInvalid(): boolean {
        const emailControl = this.registerForm.get('email');
        return emailControl!.invalid && (emailControl!.dirty || emailControl!.touched);
    }

    isPasswordInvalid(): boolean {
        const passwordControl = this.registerForm.get('password');
        return passwordControl!.invalid && (passwordControl!.dirty || passwordControl!.touched);
    }
}

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        if (password === confirmPassword || confirmPassword === '') {
            return null
        } else {
            control.get('confirmPassword')?.setErrors({passwordMismatch: true});
            return {passwordMismatch: true};
        }
    };
}
