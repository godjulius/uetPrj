import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CourseLayoutService {
    isSidebarOpen = true;
    constructor() {
    }

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    closeSideBar() {
      this.isSidebarOpen = false
    }

    openSideBar() {
      this.isSidebarOpen = true;
    }
}
