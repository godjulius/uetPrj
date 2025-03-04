import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PrimeNG} from 'primeng/config';
import {TranslateService} from '@ngx-translate/core';
import {Toast} from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, Toast],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
    title = 'Tiramisu bạc hà';

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
