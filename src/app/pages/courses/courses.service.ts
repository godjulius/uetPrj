import {inject, Injectable} from '@angular/core';
import {ICourse} from './courses.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, of} from 'rxjs';
import {MessageService} from 'primeng/api';
import {ALL_CATEGORY, CATEGORY, COURSE, COURSE_ALL} from '../../core/constants/api.const';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private readonly baseUrl = environment.baseUrl;
    private httpClient = inject(HttpClient);
    private messageService = inject(MessageService);
    courses: ICourse[] = [
        {
            id: 1,
            title: "React for Beginners",
            description: "Học React từ cơ bản đến nâng cao với dự án thực tế.",
            price: 29.99,
            rating: 4.7,
            students: 15000,
            lessons: 25,
            thumbnail: "https://source.unsplash.com/400x300/?react",
            categories: ["Web Development"],
            instructor: "John Doe",
            level: "beginner",
            language: "English",
            duration: "12h 45m",
            requirements: ["Biết HTML, CSS, JavaScript"],
            whatYouWillLearn: ["Hiểu React", "State & Props", "Hooks", "Redux"],
            lastUpdated: "2025-02-15",
            content: [
                {
                    sectionTitle: "Introduction",
                    lessons: [
                        { title: "What is React?", duration: "10m", freePreview: true },
                        { title: "Setup Development Environment", duration: "15m" }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Mastering Python",
            description: "Học Python từ cơ bản đến chuyên sâu, bao gồm AI và ML.",
            price: 39.99,
            rating: 4.8,
            students: 20000,
            lessons: 30,
            thumbnail: "https://source.unsplash.com/400x300/?python",
            categories: ["Programming"],
            instructor: "Jane Smith",
            level: "intermediate",
            language: "English",
            duration: "20h 30m",
            requirements: ["Không cần kiến thức lập trình trước"],
            whatYouWillLearn: ["Python Basics", "OOP", "Web Scraping", "Data Science"],
            lastUpdated: "2025-01-20",
            content: [
                {
                    sectionTitle: "Getting Started",
                    lessons: [
                        { title: "Introduction to Python", duration: "12m", freePreview: true },
                        { title: "Installing Python and IDE", duration: "20m" }
                    ]
                }
            ]
        },
        {
            id: 3,
            title: "Fullstack Web Development",
            description: "Tạo website hoàn chỉnh với React, Node.js, MongoDB.",
            price: 49.99,
            rating: 4.9,
            students: 18000,
            lessons: 40,
            thumbnail: "https://source.unsplash.com/400x300/?web",
            categories: ["Web Development"],
            instructor: "Mark Wilson",
            level: "advanced",
            language: "English",
            duration: "35h 10m",
            requirements: ["Biết JavaScript cơ bản"],
            whatYouWillLearn: ["Frontend với React", "Backend với Node.js", "Database với MongoDB"],
            lastUpdated: "2025-02-05",
            content: [
                {
                    sectionTitle: "Introduction",
                    lessons: [
                        { title: "What is Fullstack Development?", duration: "15m", freePreview: true },
                        { title: "Project Setup", duration: "20m" }
                    ]
                }
            ]
        },
        // Tiếp tục tạo thêm khóa học khác...
    ];
    constructor() {
        for (let i = 4; i <= 30; i++) {
            this.courses.push({
                id: i,
                title: `Course ${i}`,
                description: `Khóa học số ${i} về công nghệ`,
                price: Math.floor(Math.random() * 50) + 10, // Giá từ 10-60 USD
                rating: Number((Math.random() * 2 + 3).toFixed(1)), // Rating từ 3.0 - 5.0
                students: Math.floor(Math.random() * 20000) + 1000, // Học viên từ 1000-21000
                lessons: Math.floor(Math.random() * 40) + 10, // Bài học từ 10-50
                thumbnail: `https://source.unsplash.com/400x300/?technology,${i}`,
                categories: [["Web Development", "Data Science", "AI", "Mobile Development", "Cyber Security"][i % 5]],
                instructor: `Instructor ${i}`,
                level: ["beginner", "intermediate", "advanced"][i % 3] as "beginner" | "intermediate" | "advanced",
                language: "English",
                duration: `${Math.floor(Math.random() * 30) + 5}h ${Math.floor(Math.random() * 60)}m`,
                requirements: [`Requirement for course ${i}`],
                whatYouWillLearn: [`Learning topic ${i}-1`, `Learning topic ${i}-2`],
                lastUpdated: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                content: [
                    {
                        sectionTitle: `Introduction to Course ${i}`,
                        lessons: [
                            { title: `Lesson 1 of Course ${i}`, duration: "10m", freePreview: i % 3 === 0 },
                            { title: `Lesson 2 of Course ${i}`, duration: "15m" }
                        ]
                    }
                ]
            });
        }
    }

    createCourse(courseFormData: any) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${COURSE}`, courseFormData));
    }

    getCourseById(courseId: string) {
        return this.handleError(this.httpClient.get(`${this.baseUrl}${COURSE}/${courseId}`));
    }

    getAllCategories() {
        return this.handleError(this.httpClient.get(`${this.baseUrl}${ALL_CATEGORY}`));
    }

    addCategory(newCategory: string) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${CATEGORY}`, { name: newCategory }));
    }

    getCourses(page: number, size: number) {
        return this.handleError(this.httpClient.get(`${this.baseUrl}${COURSE_ALL}?page=${page}&size=${size}`));
    }

    handleError(observable: any) {
        return observable.pipe(
            catchError((error: any) => {
                console.log(error);
                if (error.status === 409) {
                    this.messageService.add({severity:'error', summary: 'Lỗi', detail: error.error.detail});
                }
                return of(null);
            })
        );
    }

}
