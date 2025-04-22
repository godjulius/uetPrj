import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CourseLayoutService {
    isSidebarOpen = true;
    courseId: string | undefined = undefined;
    lessonId: string | undefined = undefined;
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

    setCourseId(courseId: string | undefined) {
        this.courseId = courseId;
    }

    setLessonId(lessonId: string | undefined) {
        this.lessonId = lessonId;
    }
}
