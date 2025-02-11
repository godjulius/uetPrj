import { Component } from '@angular/core';
import {Card} from 'primeng/card';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-button-demo',
  standalone: true,
    imports: [
        Card,
        ButtonModule,
    ],
  templateUrl: './button-demo.component.html',
  styleUrl: './button-demo.component.css'
})
export class ButtonDemoComponent {
    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }
}
