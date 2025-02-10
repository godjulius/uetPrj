import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    sidebarSubject = new Subject<boolean>();
    visibleSidebar = false;
    constructor() {
    }

    toggleSidebar() {
        this.visibleSidebar = !this.visibleSidebar;
        this.sidebarSubject.next(this.visibleSidebar);
    }
}
