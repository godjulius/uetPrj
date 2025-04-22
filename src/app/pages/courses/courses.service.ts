import {inject, Injectable} from '@angular/core';
import {ICourse} from './courses.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {MessageService} from 'primeng/api';
import {ALL_CATEGORY, CATEGORY, COURSE, COURSE_ALL, LESSON} from '../../core/constants/api.const';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private readonly baseUrl = environment.baseUrl;
    private httpClient = inject(HttpClient);
    private messageService = inject(MessageService);

    constructor(private router: Router) {

    }

    createCourse(courseFormData: any) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${COURSE}`, courseFormData));
    }

    updateCourse(courseFormData: any, courseId: string) {
        return this.handleError(this.httpClient.put(`${this.baseUrl}${COURSE}/${courseId}`, courseFormData));
    }

    getCourseById(courseId: string) {
        return this.handleError(this.httpClient.get(`${this.baseUrl}${COURSE}/${courseId}`));
    }

    getAllCategories() {
        return this.handleError(this.httpClient.get(`${this.baseUrl}${ALL_CATEGORY}`));
    }

    addCategory(newCategory: string) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${CATEGORY}`, {name: newCategory}));
    }

    getCourses(page: number, size: number) {
        return this.handleError(this.httpClient.get(`${this.baseUrl}${COURSE_ALL}?page=${page}&size=${size}`));
    }

    addSection(courseId: string, section: any) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${COURSE}/${courseId}/section`, section));
    }

    addLesson(sectionId: string, lesson: any) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${COURSE}/section/${sectionId}/lesson`, lesson));
    }

    uploadCourseThumbnail(courseId: string, thumbnail: File) {
        const formData = new FormData();
        formData.append('file', thumbnail);
        return this.handleError(this.httpClient.post(`${this.baseUrl}${COURSE}/${courseId}/thumbnail`, formData));
    }

    postVideo(lessonId: string, video: File) {
        const formData = new FormData();
        formData.append('file', video);
        console.log(lessonId);
        return this.handleError(this.httpClient.post(`${this.baseUrl}${COURSE}/lesson/${lessonId}/video`, formData, {
            reportProgress: true,
            observe: 'events'
        }));
    }

    addQuiz(sectionId: string, quiz: any) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${COURSE}/section/${sectionId}/quiz/`, quiz));
    }

    getLessonById(lessonId: string) {
        return this.handleError(this.httpClient.get(`${this.baseUrl}${LESSON}/${lessonId}`));
    }

    handleError(observable: any) {
        return observable.pipe(
            catchError((error: any) => {
                console.log(error);
                if (error.status === 422) {
                    console.log("hhh")
                    this.messageService.add({severity: 'error', summary: 'Lỗi', detail: error.error.detail});
                    this.router.navigate(['/404']);
                }
                if (error.status === 409) {
                    this.messageService.add({severity: 'error', summary: 'Lỗi', detail: error.error.detail});
                }
                return of(null);
            })
        );
    }

}
