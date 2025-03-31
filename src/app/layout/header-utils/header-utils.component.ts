import {Component, inject, input, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {DrawerModule} from 'primeng/drawer';
import {Avatar} from 'primeng/avatar';
import {Popover, PopoverModule} from 'primeng/popover';
import {AuthService} from '../../pages/auth/auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {IProfileModel} from '../../pages/auth/auth.model';
import {CookieStorageService} from '../../core/services/cookie-storage.service';
import {AUTH_TOKEN} from '../../core/constants/common.const';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BaseComponent} from '../../core/base.component';

@Component({
    selector: 'app-header-utils',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DrawerModule,
        Avatar,
        PopoverModule,
    ],
    templateUrl: './header-utils.component.html',
    styleUrl: './header-utils.component.css'
})
export class HeaderUtilsComponent extends BaseComponent implements OnInit {
    @ViewChild('languages') languages!: Popover;
    isSettingVisible = input(true)
    private authService = inject(AuthService)
    private router = inject(Router);
    private messageService = inject(MessageService);
    private cookieStorageService = inject(CookieStorageService);
    isDarkTheme: boolean = false;
    settingDrawer: boolean = false;
    languagesList: any[] = [
        {
            name: 'Vietnamese',
            flag: 'vn',
            icon: 'assets/images/flags/vietnam_flag.png',
        },
        {
            name: 'English(UK)',
            flag: 'uk',
            icon: 'assets/images/flags/uk_flag.png',
        },
    ];
    userProfile!: IProfileModel | undefined

    constructor() {
        super()
        this.checkDarkTheme();
    }

    ngOnInit() {
        if (this.cookieStorageService.getCookie(AUTH_TOKEN)) {
            this.authService.profileObject
                .pipe(
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe(
                (profile: any) => {
                    if (profile) {
                        this.userProfile = profile;
                    }
                }
            )
        } else {
            this.userProfile = undefined
        }
    }

    checkDarkTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            && document.documentElement.classList.contains('dark')
        ) {
            document.documentElement.classList.add('dark');
            this.isDarkTheme = true;
        }
    }

    changeColorTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            this.isDarkTheme = false;
        } else {
            document.documentElement.classList.add('dark');
            this.isDarkTheme = true;
        }
    }

    selectLanguage(language: any) {
        console.log(language);
        this.languages.hide();
    }

    openDialogLanguage(event: any) {
        this.languages.toggle(event);
    }

    handleSignOut() {
        this.authService.logout()
        this.router.navigate(['/account/login']).then(() => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Logout successfully'});
        });
    }
}
