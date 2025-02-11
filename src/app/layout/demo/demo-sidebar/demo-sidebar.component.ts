import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Drawer, DrawerModule} from 'primeng/drawer';
import {LayoutService} from '../layout.service';
import {StyleClass} from 'primeng/styleclass';
import {AvatarModule} from 'primeng/avatar';
import {Ripple} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {PanelMenu} from 'primeng/panelmenu';
import {ActivatedRoute, Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-demo-sidebar',
  standalone: true,
    imports: [
        CommonModule,
        DrawerModule,
        ButtonModule,
        Ripple,
        AvatarModule,
        PanelMenu,
        RouterLink,
        RouterModule,
    ],
  templateUrl: './demo-sidebar.component.html',
  styleUrl: './demo-sidebar.component.css'
})
export class DemoSidebarComponent implements OnInit {
    items!: MenuItem[];
    visible: boolean = false;
    @ViewChild('drawerRef') drawerRef!: Drawer;
    constructor(private layoutService: LayoutService, private router: Router, private route: ActivatedRoute) {
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
                    }
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
