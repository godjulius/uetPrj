import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {MegaMenu} from 'primeng/megamenu';
import {MegaMenuItem} from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {HeaderUtilsComponent} from '../../../layout/header-utils/header-utils.component';

@Component({
    selector: 'app-landing-header',
    standalone: true,
    imports: [
        CommonModule,
        MegaMenu, ButtonModule, AvatarModule, Ripple, RouterLink, RouterModule, HeaderUtilsComponent
    ],
    templateUrl: './landing-header.component.html',
    styleUrl: './landing-header.component.css'
})
export class LandingHeaderComponent implements OnInit {
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (window.scrollY > 48) {
            (document.getElementById('landing-header')?.firstChild! as HTMLDivElement).classList.add('landing-header-sticky');
        } else {
            (document.getElementById('landing-header')?.firstChild! as HTMLDivElement).classList.remove('landing-header-sticky');
        }
    }

    constructor(private router: Router) {

    }


    items: MegaMenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Features',
                root: true,
                items: [
                    [
                        {
                            items: [
                                {
                                    label: 'Components', icon: 'pi pi-list', subtext: 'Demo components',
                                    routerLink: 'demo'
                                },
                                {label: 'Customers', icon: 'pi pi-users', subtext: 'Subtext of item'},
                                {label: 'Case Studies', icon: 'pi pi-file', subtext: 'Subtext of item'}
                            ]
                        }
                    ],
                    [
                        {
                            items: [
                                {label: 'Solutions', icon: 'pi pi-shield', subtext: 'Subtext of item'},
                                {label: 'Faq', icon: 'pi pi-question', subtext: 'Subtext of item'},
                                {label: 'Library', icon: 'pi pi-search', subtext: 'Subtext of item'}
                            ]
                        }
                    ],
                    [
                        {
                            items: [
                                {label: 'Community', icon: 'pi pi-comments', subtext: 'Subtext of item'},
                                {label: 'Rewards', icon: 'pi pi-star', subtext: 'Subtext of item'},
                                {label: 'Investors', icon: 'pi pi-globe', subtext: 'Subtext of item'}
                            ]
                        }
                    ],
                    [
                        {
                            items: [{
                                image: 'https://primefaces.org/cdn/primeng/images/uikit/uikit-system.png',
                                label: 'GET STARTED',
                                subtext: 'Build spectacular apps in no time.'
                            }]
                        }
                    ]
                ]
            },
            {
                label: 'Resources',
                root: true
            },
            {
                label: 'Contact',
                root: true
            }
        ];
    }

    handleLogin() {
        this.router.navigate(['account']);
    }
}
