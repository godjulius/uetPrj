import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import {
    FormBuilder,
    FormGroup, FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseComponent } from '../../../core/base.component';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';
import { FluidModule } from 'primeng/fluid';
import {FileUpload} from 'primeng/fileupload';
import { TextareaModule } from 'primeng/textarea';
import {Select} from 'primeng/select';
import {AuthService} from '../../auth/auth.service';
import {IProfileModel} from '../../auth/auth.model';
import {finalize} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [CommonModule, Button, InputText, Message, ReactiveFormsModule, RouterLink, TranslatePipe,
        FormsModule, DatePickerModule, FluidModule, FileUpload, TextareaModule, Select
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent extends BaseComponent implements OnInit{
    profileForm!: FormGroup;
    authService = inject(AuthService);
    private router = inject(Router);
    private readonly messageService = inject(MessageService);
    loading = false;
    email: string = this.authService.getProfile().email;
    maxDate: Date = new Date();
    avatarUrl: string | null = null;
    genderOptions = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
        { name: 'Other', value: 'other' }
    ];

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
            dob: ['', Validators.required],
            gender: [undefined],
            bio: ['', [Validators.maxLength(500)]],
        });
        this.getProfile()
        this.authService.getAvatarUrl().subscribe(
            (res: any) => {
                console.log(res)
                this.avatarUrl = res;
            }
        )
    }

    getProfile() {
        this.authService.getUserInfo()
    }

    saveProfile() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            const firstInvalidField = Object.keys(this.profileForm.controls).find(field =>
                this.profileForm.get(field)?.invalid
            );

            if (firstInvalidField) {
                document.getElementById(firstInvalidField)?.focus();
            }
            return;
        }

        this.loading = true;

        const genderValue = this.profileForm.value.gender.value || 'other';

        const profileData = {
            ...this.authService.getProfile(),
            fullName: this.profileForm.value.fullName,
            phone: this.profileForm.value.phone,
            date_of_birth: this.profileForm.value.dob,
            gender: genderValue,
            bio: this.profileForm.value.bio,
        } as IProfileModel;

        console.log(profileData);

        this.authService.updateProfile(profileData)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((res: any) => {
                if (res) {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: `Profile updated successfully`});
                }
            })
        ;
    }

    isFieldInvalid(field: string): boolean {
        const control = this.profileForm.get(field);
        return control!.invalid && (control!.dirty || control!.touched);
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.avatarUrl = URL.createObjectURL(input.files[0]);
            this.authService.avatarUrl = this.avatarUrl;
            const avatarFile = input.files[0];
            console.log(avatarFile);
            this.authService.postAvatar(avatarFile).
                pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe((res: any) => {
                    if (res) {
                        console.log(res)
                        this.messageService.add({severity: 'success', summary: 'Success', detail: `Avatar updated successfully`});
                    }
                })
        }
    }
}
