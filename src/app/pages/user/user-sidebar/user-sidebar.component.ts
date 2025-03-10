import {Component, OnInit, ViewChild} from '@angular/core';
import {Avatar} from "primeng/avatar";
import {Button} from "primeng/button";
import {Drawer} from "primeng/drawer";
import {NgIf} from "@angular/common";
import {PanelMenu} from "primeng/panelmenu";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MenuItem} from 'primeng/api';
import {LayoutService} from '../../../shared/services/layout.service';

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
export class UserSidebarComponent implements OnInit {
    items!: MenuItem[];
    visible: boolean = false;
    @ViewChild('drawerRef') drawerRef!: Drawer;
    constructor(private router: Router, private layoutService: LayoutService) {
        this.sidebarSubjectSubscribe();
    }

    ngOnInit() {
        this.items = [
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
                    {
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },{
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'end',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    },
                ]
            }
        ];
    }

    sidebarSubjectSubscribe() {
        this.layoutService.sidebarSubject.subscribe((isCollapsed: boolean) => {
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
}
