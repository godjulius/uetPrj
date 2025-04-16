import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {MegaMenu} from 'primeng/megamenu';
import {MegaMenuItem} from 'primeng/api';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {HeaderUtilsComponent} from '../../../layout/header-utils/header-utils.component';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputGroup} from 'primeng/inputgroup';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BaseComponent} from '../../../core/base.component';
import {AuthService} from '../../auth/auth.service';
import {IProfileModel} from '../../auth/auth.model';

@Component({
    selector: 'app-landing-header',
    standalone: true,
    imports: [
        CommonModule,
        MegaMenu, ButtonModule, AvatarModule, RouterLink, RouterModule, HeaderUtilsComponent, Dialog,
        InputTextModule, FormsModule, InputGroup
    ],
    templateUrl: './landing-header.component.html',
    styleUrl: './landing-header.component.css'
})
export class LandingHeaderComponent extends BaseComponent implements OnInit {
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (window.scrollY > 48) {
            (document.getElementById('landing-header')?.firstChild! as HTMLDivElement).classList.add('landing-header-sticky');
        } else {
            (document.getElementById('landing-header')?.firstChild! as HTMLDivElement).classList.remove('landing-header-sticky');
        }
    }

    @ViewChild('inputSearch') inputSearch!: ElementRef;
    searchSubject = new Subject<string>();
    showSearch: boolean = false;
    searchKeyword: string = '';
    // use when user click enter immediately
    _searchKeyword: string = '';
    isLoggedIn = false;
    items: MegaMenuItem[] | undefined;
    userProfile: IProfileModel | undefined;

    constructor(private router: Router, private authService: AuthService) {
        super();
        this.searchSubjectSubs();
        this.isLoggedIn = this.authService.isLoggedin()
        this.authService.profileObject.subscribe((_profile: IProfileModel) => {
            this.userProfile = _profile;
        })
    }


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
                                {
                                    label: 'Learning page', icon: 'pi pi-file', subtext: 'Demo learning page',
                                    routerLink: 'learning'
                                },
                                {label: 'Instructor detail', icon: 'pi pi-users', subtext: 'Demo instructor detail',
                                    routerLink: 'instructor/123',
                                },
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
                label: 'Contact',
                root: true
            }
        ];
    }

    handleLogin() {
        this.router.navigate(['account']);
    }

    handleToggleSearch() {
        this.showSearch = !this.showSearch;
        console.log(this.inputSearch)
    }

    courses = [
        {
            image: 'https://via.placeholder.com/150/FF5733',
            title: 'Angular Basics',
            instructor: 'John Doe'
        },
        {
            image: 'https://via.placeholder.com/150/33B5FF',
            title: 'Advanced React',
            instructor: 'Jane Smith'
        },
        {
            image: 'https://via.placeholder.com/150/75FF33',
            title: 'Vue Mastery',
            instructor: 'Michael Brown'
        },
        {
            image: 'https://via.placeholder.com/150/FF33A1',
            title: 'Node.js Essentials',
            instructor: 'Emily White'
        },
        {
            image: 'https://via.placeholder.com/150/FFA833',
            title: 'TypeScript Deep Dive',
            instructor: 'Chris Black'
        },
        {
            image: 'https://via.placeholder.com/150/3385FF',
            title: 'Full Stack Development',
            instructor: 'Anna Taylor'
        },
        {
            image: 'https://via.placeholder.com/150/33FF9A',
            title: 'Python for Beginners',
            instructor: 'David Wilson'
        },
        {
            image: 'https://via.placeholder.com/150/FF3369',
            title: 'Data Science with Python Data Science with Python',
            instructor: 'Sophia Johnson'
        }
    ];


    handleSearch() {
        this.handleToggleSearch()

        this.router.navigate(['/courses'], {
            queryParams: {token: this._searchKeyword}
        })
    }

    handleFocusInput() {
        this.searchKeyword = '';
        this._searchKeyword = this.searchKeyword;
        this.inputSearch.nativeElement.focus();
    }

    handleInputSearch(event: Event) {
        this.searchSubject.next((event.target as HTMLInputElement).value);
    }

    searchSubjectSubs() {
        this.searchSubject
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((keyword) => {
                this.searchKeyword = keyword;
            })
    }

    navigateToDashBoard() {
        this.router.navigate(['/user/profile']);
    }
}
