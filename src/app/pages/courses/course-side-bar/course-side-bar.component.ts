import {Component, inject, ViewChild} from '@angular/core';
import {Tooltip} from 'primeng/tooltip';
import {BadgeModule} from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {Popover, PopoverModule} from 'primeng/popover';
import {CourseLayoutService} from '../course-layout.service';

@Component({
  selector: 'app-course-side-bar',
  standalone: true,
  imports: [
      Tooltip,
      AccordionModule,
      AvatarModule, BadgeModule,
      ButtonModule,
      PopoverModule
  ],
  templateUrl: './course-side-bar.component.html',
  styleUrl: './course-side-bar.component.css'
})
export class CourseSideBarComponent {
    @ViewChild('resourcesPopover') resourcesPopover!: Popover;
    courseLayoutService = inject(CourseLayoutService)
    openResourcePopover(event: Event) {
        this.resourcesPopover.toggle(event)
    }

    handleCloseSidebar() {
        this.courseLayoutService.closeSideBar()
    }
}
