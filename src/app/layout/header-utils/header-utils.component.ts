import {Component, ViewChild} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {DrawerModule} from 'primeng/drawer';
import {Avatar} from 'primeng/avatar';
import {Popover, PopoverModule} from 'primeng/popover';

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
export class HeaderUtilsComponent {
    @ViewChild('languages') languages!: Popover;
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

    constructor() {
        this.checkDarkTheme();

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
}
