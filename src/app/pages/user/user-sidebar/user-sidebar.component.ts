import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Avatar} from "primeng/avatar";
import {Button} from "primeng/button";
import {Drawer} from "primeng/drawer";
import {NgIf} from "@angular/common";
import {PanelMenu} from "primeng/panelmenu";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MenuItem} from 'primeng/api';
import {LayoutService} from '../../../shared/services/layout.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BaseComponent} from '../../../core/base.component';
import {AuthService} from '../../auth/auth.service';
import {IProfileModel} from '../../auth/auth.model';

@Component({
    selector: 'app-user-sidebar',
    standalone: true,
    imports: [
        Avatar,
        Button,
        Drawer,
        NgIf,
        PanelMenu,
        Ripple,
        RouterLinkActive,
        RouterLink
    ],
    templateUrl: './user-sidebar.component.html',
    styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent extends BaseComponent implements OnInit {
    items: MenuItem[] = [
        {
            label: 'User settings',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'User profile',
                    icon: 'pi pi-user-edit',
                    routerLink: 'profile',
                },
            ]
        },
        {
            label: 'Courses',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Attending courses',
                    icon: 'pi pi-book',
                    routerLink: 'attending-courses',
                },
                {
                    label: 'Your courses',
                    icon: 'pi pi-list',
                    routerLink: 'user-courses',
                },
            ]
        },
        {
            label: 'External',
            icon: 'pi pi-link',
            items: [
                {
                    label: 'Angular',
                    icon: 'pi pi-star',
                    url: 'https://angular.io/'
                },
                {
                    label: 'Vite.js',
                    icon: 'pi pi-bookmark',
                    url: 'https://vitejs.dev/'
                },
            ]
        }
    ];
    visible: boolean = false;
    @ViewChild('drawerRef') drawerRef!: Drawer;
    authService = inject(AuthService)
    profile: IProfileModel | undefined;

    constructor(private router: Router, private layoutService: LayoutService) {
        super();
        this.sidebarSubjectSubscribe();
    }


    ngOnInit() {
        this.initData();
    }

    private initData() {
        this.profileSubscribe();
    }

    sidebarSubjectSubscribe() {
        this.layoutService.sidebarSubject
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((isCollapsed: boolean) => {
                this.visible = isCollapsed;
            });
    }

    toggleSideBar() {
        this.layoutService.toggleSidebar();
    }

    closeCallback(e: any): void {
        this.drawerRef.close(e);
    }

    closeDrawerCallback(e: any): void {
        this.drawerRef.close(e);
    }

    profileSubscribe() {
        this.authService.profileObject
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((profile: IProfileModel) => {
                console.log(1);
                this.profile = profile;
                if (!profile.isInstructor) {
                    this.items = studentMenu;
                } else {
                    this.items = instructorMenu;
                }
            })
    }
}

const studentMenu: MenuItem[] = [
    {
        label: 'User settings',
        icon: 'pi pi-user',
        items: [
            {
                label: 'User profile',
                icon: 'pi pi-user-edit',
                routerLink: 'profile',
            },
        ]
    },
    {
        label: 'Courses',
        icon: 'pi pi-palette',
        items: [
            {
                label: 'Attending courses',
                icon: 'pi pi-book',
                routerLink: 'attending-courses',
            },
        ]
    },
    {
        label: 'External',
        icon: 'pi pi-link',
        items: [
            {
                label: 'Angular',
                icon: 'pi pi-star',
                url: 'https://angular.io/'
            },
            {
                label: 'Vite.js',
                icon: 'pi pi-bookmark',
                url: 'https://vitejs.dev/'
            },
        ]
    }
];

const instructorMenu: MenuItem[] = [
    {
        label: 'User settings',
        icon: 'pi pi-user',
        items: [
            {
                label: 'User profile',
                icon: 'pi pi-user-edit',
                routerLink: 'profile',
            },
        ]
    },
    {
        label: 'Courses',
        icon: 'pi pi-palette',
        items: [
            {
                label: 'Statistics',
                icon: 'pi pi-chart-line',
                routerLink: 'statistics',
            },
            {
                label: 'Attending courses',
                icon: 'pi pi-book',
                routerLink: 'attending-courses',
            },
            {
                label: 'Your courses',
                icon: 'pi pi-list',
                routerLink: 'user-courses',
            },
        ]
    },
    {
        label: 'External',
        icon: 'pi pi-link',
        items: [
            {
                label: 'Angular',
                icon: 'pi pi-star',
                url: 'https://angular.io/'
            },
            {
                label: 'Vite.js',
                icon: 'pi pi-bookmark',
                url: 'https://vitejs.dev/'
            },
        ]
    }
]
