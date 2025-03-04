import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {AuthService} from '../auth.service';
import {SignUpModel} from '../auth.model';
import {passwordMatchValidator} from '../sign-up/sign-up.component';
import {BaseComponent} from '../../../core/base.component';
import {Message} from 'primeng/message';
import {finalize} from 'rxjs';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-teacher-signup',
  standalone: true,
    imports: [
        CommonModule,
        Button,
        Card,
        FormsModule,
        InputText,
        ReactiveFormsModule,
        RouterLink,
        TranslatePipe,
        Message
    ],
  templateUrl: './teacher-signup.component.html',
  styleUrl: './teacher-signup.component.css'
})
export class TeacherSignupComponent extends BaseComponent implements OnInit{
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
                })
            )
            .subscribe((res: any) => {
                if (res) {
                    console.log(res);
                    this.messageService.add({severity: 'success', summary: 'Success', detail: `Account created successfully`});

                    // this.router.navigate(['/teacher']);
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
