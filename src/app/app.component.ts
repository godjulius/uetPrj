import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PrimeNG} from 'primeng/config';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'angularBase';

    constructor(private primeng: PrimeNG, private translateService: TranslateService) {
        this.checkDarkTheme();
    }

    ngOnInit() {
        this.translateService.setDefaultLang('vi');

    }

    checkDarkTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe(res => this.primeng.setTranslation(res));
    }
}
