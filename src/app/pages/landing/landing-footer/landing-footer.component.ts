import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Button, ButtonLabel} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
    imports: [
        CommonModule,
        Button,
        ButtonLabel,
        RouterLink,
    ],
  templateUrl: './landing-footer.component.html',
  styleUrl: './landing-footer.component.css'
})
export class LandingFooterComponent {

}
