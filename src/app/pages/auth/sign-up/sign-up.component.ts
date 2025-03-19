import {Component, inject, OnInit} from '@angular/core';
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
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {BaseComponent} from '../../../core/base.component';
import {AuthService} from '../auth.service';
import {SignUpModel} from '../auth.model';
import {finalize} from 'rxjs';
import {MessageService} from 'primeng/api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [CommonModule, Button, Card, InputText, Message, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseComponent implements OnInit {
    registerForm!: FormGroup;
    authService = inject(AuthService)
    private router = inject(Router);
    private readonly messageService = inject(MessageService)
    loading = false;
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
        if (this.registerForm.invalid) {
            return
        }
        this.loading = true;
        const account: SignUpModel = {
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
        }
        this.authService.signup(account)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((res: any) => {
                if (res) {
                    console.log(res);
                    this.messageService.add({severity: 'success', summary: 'Success', detail: `Account created successfully`});
                    this.router.navigate(['/user/profile']);
                }
            })
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
