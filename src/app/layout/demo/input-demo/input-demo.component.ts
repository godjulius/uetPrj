import {Component} from '@angular/core';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {CommonModule} from '@angular/common';
import {FloatLabel} from 'primeng/floatlabel';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {SelectModule} from 'primeng/select';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {Fluid} from 'primeng/fluid';
import {InputMask} from 'primeng/inputmask';
import {InputOtp} from 'primeng/inputotp';

@Component({
    selector: 'app-input-demo',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        InputTextModule,
        FloatLabel,
        InputGroupModule, InputGroupAddonModule, SelectModule, InputNumberModule,
        ButtonModule, MenuModule,
        InputMask, Fluid,
        InputOtp,
    ],
    templateUrl: './input-demo.component.html',
    styleUrl: './input-demo.component.css'
})
export class InputDemoComponent {
    cities: City[] = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'},
    ];

    itemsInputWithButton: MenuItem[] = [{label: 'Web Search'}, {label: 'AI Assistant'}, {label: 'History'}];
}

interface City {
    name: string;
    code: string;
}
