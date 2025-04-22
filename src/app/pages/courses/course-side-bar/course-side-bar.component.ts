import {Component, inject, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Tooltip} from 'primeng/tooltip';
import {BadgeModule} from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {Popover, PopoverModule} from 'primeng/popover';
import {CourseLayoutService} from '../course-layout.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-course-side-bar',
  standalone: true,
  imports: [
      CommonModule,
      Tooltip,
      AccordionModule,
      AvatarModule, BadgeModule,
      ButtonModule,
      PopoverModule
  ],
  templateUrl: './course-side-bar.component.html',
  styleUrl: './course-side-bar.component.css'
})
export class CourseSideBarComponent implements OnChanges {
    @Input({required: true}) courseContents: any;
    @Input({required: true}) currentLessonId: string | undefined;
    @ViewChild('resourcesPopover') resourcesPopover!: Popover;
    courseLayoutService = inject(CourseLayoutService)

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['courseContents'] && changes['courseContents'].currentValue) {
            console.log(this.courseContents)
        }
    }

    openResourcePopover(event: Event) {
        this.resourcesPopover.toggle(event)
    }

    handleCloseSidebar() {
        this.courseLayoutService.closeSideBar()
    }

    handleClickLesson(lessonId: string) {
        console.log(lessonId)
    }
}
