import { Component, inject, OnInit } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { Button } from 'primeng/button';
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
        FormsModule, DatePickerModule, FluidModule, TextareaModule, Select
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
    providers: [DatePipe]
})
export class ProfileComponent extends BaseComponent implements OnInit{
    profileForm!: FormGroup;
    authService = inject(AuthService);
    private router = inject(Router);
    datePipe = inject(DatePipe);
    private readonly messageService = inject(MessageService);
    loading = false;
    email: string = ''
    maxDate: Date = new Date();
    avatarUrl: string | null = null;
    genderOptions = [
        { name: 'Male', value: 'Male' },
        { name: 'Female', value: 'Female' },
        { name: 'Other', value: 'Other' }
    ];
    userProfile!: IProfileModel | undefined;
    constructor(private fb: FormBuilder) {
        super();
        this.profileForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
            dob: ['', Validators.required],
            gender: [undefined],
            bio: ['', [Validators.maxLength(500)]],
        });
        this.authService.profileObjectEmit()
    }

    ngOnInit(): void {
        this.getProfile()
    }

    getProfile() {
        this.authService.profileObject.subscribe(
            (profile: any) => {
                if (profile) {
                    this.userProfile = profile;
                    const genderVal = this.genderOptions.find((option) => option.value === profile.gender)
                    this.profileForm.setValue({
                        fullName: profile.fullName,
                        phone: profile.phoneNumber,
                        dob: new Date(profile.dateOfBirth),
                        gender: genderVal,
                        bio: profile.bio,
                    })
                    this.email = profile.email
                }
            }
        )
        this.authService.avatarObject.subscribe((avatarUrl: any) => {
            this.avatarUrl = avatarUrl;
        })
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
        const date = new Date(this.profileForm.value.dob);
        const formatedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
        const profileData = {
            ...this.authService.getProfile(),
            fullName: this.profileForm.value.fullName,
            phoneNumber: this.profileForm.value.phone,
            dateOfBirth: formatedDate,
            gender: genderValue,
            bio: this.profileForm.value.bio,
        } as IProfileModel;

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
                    this.authService.profileObject.next(res);
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
            this.authService.postAvatar(avatarFile).
                pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe((res: any) => {
                    if (res) {
                        this.messageService.add({severity: 'success', summary: 'Success', detail: `Avatar updated successfully`});
                    }
                })
        }
    }
}
