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
  selector: 'app-teacher-sidebar',
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
  templateUrl: './teacher-sidebar.component.html',
  styleUrl: './teacher-sidebar.component.css'
})
export class TeacherSidebarComponent implements OnInit {
    items!: MenuItem[];
    visible: boolean = false;
    @ViewChild('drawerRef') drawerRef!: Drawer;
    constructor(private router: Router, private layoutService: LayoutService) {
        this.sidebarSubjectSubscribe();
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Main',
                icon: 'pi pi-home',
                command: () => {
                    this.router.navigate(['/demo']);
                }
                // routerLink: '/demo',
            },
            {
                label: 'Demo components',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Demo inputs',
                        icon: 'pi pi-pencil',
                        routerLink: 'inputs',
                    },
                    {
                        label: 'Button Demo page',
                        icon: 'pi pi-eraser',
                        routerLink: 'buttons',
                    },
                    {
                        label: 'Button Demo page',
                        icon: 'pi pi-link',
                        routerLink: 'cards',
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
