import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
      CommonModule,
      ButtonModule,
      Ripple
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
