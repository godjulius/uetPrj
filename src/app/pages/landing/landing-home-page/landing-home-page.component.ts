import { Component } from '@angular/core';
import {HeroComponent} from "../hero/hero.component";
import {LandingCourseListComponent} from "../landing-course-list/landing-course-list.component";
import {LandingFooterComponent} from '../landing-footer/landing-footer.component';

@Component({
  selector: 'app-landing-home-page',
  standalone: true,
    imports: [
        HeroComponent,
        LandingCourseListComponent,
        LandingFooterComponent
    ],
  templateUrl: './landing-home-page.component.html',
  styleUrl: './landing-home-page.component.css'
})
export class LandingHomePageComponent {

}
