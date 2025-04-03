import {Component, ViewChild} from '@angular/core';
import {Divider} from 'primeng/divider';
import {Knob} from 'primeng/knob';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Popover, PopoverModule} from 'primeng/popover';
import {ButtonModule} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-course-header',
  standalone: true,
    imports: [
        CommonModule,
        Divider,
        Knob,
        FormsModule,
        PopoverModule,
        ButtonModule,
        Menu,
        RouterLink
    ],
  templateUrl: './course-header.component.html',
  styleUrl: './course-header.component.css'
})
export class CourseHeaderComponent {
    @ViewChild('progress') progress!: Popover;
    @ViewChild('progress1') progress1!: Popover;
    value = 40;
    actionsMenu: MenuItem[] | undefined = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Favorite this course',
                    icon: 'pi pi-heart'
                },
                {
                    label: 'Edit your rating',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Unenroll from course',
                    icon: 'pi pi-times-circle'
                }
            ]
        }
    ];

    shareMenu: MenuItem[] | undefined = [
        {
            label: 'Share',
            items: [
                {
                    label: 'Recommend to a friend',
                    icon: 'pi pi-share-alt'
                },
                {
                    label: 'Get link to share',
                    icon: 'pi pi-link'
                },
            ]
        }
    ]

}
