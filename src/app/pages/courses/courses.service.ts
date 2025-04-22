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
    courses: ICourse[] = [
        {
            id: 1,
            title: "React for Beginners",
            headline: "Khóa học React cơ bản",
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
            duration: 2000,
            requirements: ["Biết HTML, CSS, JavaScript"],
            whatYouWillLearn: ["Hiểu React", "State & Props", "Hooks", "Redux"],
            lastUpdated: "2025-02-15",
            contents: [
                {
                    sectionTitle: "Introduction",
                    lessons: [
                        {title: "What is React?", duration: 2000, freePreview: true},
                        {title: "Setup Development Environment", duration: 2000}
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Mastering Python",
            headline: "Master Angular (formerly \"Angular 2\") and build awesome, reactive web apps with the successor of Angular.js",
            description: {
                "time": 1743876952713,
                "blocks": [
                    {
                        "id": "bMgnH9_f4P",
                        "type": "paragraph",
                        "data": {
                            "text": "There is a lot to learn about the Angular framework, which can be a bit daunting especially for beginners. But the good news is that there are some parts of the framework that are used much more often than others. In fact,&nbsp;<b>in Angular you will be using 10% of its features maybe 90% of the time!</b>"
                        }
                    },
                    {
                        "id": "VnDHk0G_Fw",
                        "type": "paragraph",
                        "data": {
                            "text": "If you are going to learn Angular, why not focus&nbsp;first&nbsp;on the features that you will be using all of the time, and leave the more advanced parts for later in your learning process?"
                        }
                    },
                    {
                        "id": "z1gcf23ciV",
                        "type": "paragraph",
                        "data": {
                            "text": "<b>Course Overview</b>"
                        }
                    },
                    {
                        "id": "eU1E8s-yfg",
                        "type": "paragraph",
                        "data": {
                            "text": "This course is a&nbsp;<b>beginner-friendly introduction</b>&nbsp;to the Angular framework. In this course, we are going to start by setting up your development environment, and we will use the Angular CLI to quickly scaffold a small Angular project from scratch."
                        }
                    },
                    {
                        "id": "-CYswT8EBn",
                        "type": "paragraph",
                        "data": {
                            "text": "Using this initial playground, we are then going to answer some of the most common Angular questions:"
                        }
                    },
                    {
                        "id": "8MHnouwFDG",
                        "type": "paragraph",
                        "data": {
                            "text": "<b>Why Angular</b>, what are its main advantages and key features? We will answer this by demonstrating how the change detection mechanism works, and introduce some of the Angular template syntax."
                        }
                    },
                    {
                        "id": "TbFpGSSvOR",
                        "type": "paragraph",
                        "data": {
                            "text": "We will then cover the most commonly used parts of the Angular framework that you are going to be using all the time: Components, Pipes, Services and Core directives, among others."
                        }
                    },
                    {
                        "id": "4ZWi1Eifkv",
                        "type": "paragraph",
                        "data": {
                            "text": "<b>Table of Contents</b>"
                        }
                    },
                    {
                        "id": "ic2fdETDHg",
                        "type": "paragraph",
                        "data": {
                            "text": "This course covers the following topics:"
                        }
                    },
                    {
                        "id": "iy8SARKUQC",
                        "type": "list",
                        "data": {
                            "style": "unordered",
                            "meta": {},
                            "items": [
                                {
                                    "content": "Custom components with @Component",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "Components @Input and @Output, event Emitters",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "ngFor",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "ngIf",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "ngClass",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "ngStyle",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "ngSwitch",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "Built-In Pipes",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "Async Pipe",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "Custom Pipes",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "@Injectable and Custom Services",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "HTTP Client - GET POST PUT DELETE",
                                    "meta": {},
                                    "items": []
                                }
                            ]
                        }
                    },
                    {
                        "id": "vciriLtJt9",
                        "type": "paragraph",
                        "data": {
                            "text": "<b>What Will You Learn In this Course?</b>"
                        }
                    },
                    {
                        "id": "nefT_MzHW2",
                        "type": "paragraph",
                        "data": {
                            "text": "This course will give you a practical hands-on introduction to the Angular framework. After taking this course you will feel very comfortable navigating the code of an existing Angular application and finding your way around, and you will know how to build your own custom components."
                        }
                    },
                    {
                        "id": "HH2GtowZ6A",
                        "type": "header",
                        "data": {
                            "text": "What you’ll learn",
                            "level": 4
                        }
                    },
                    {
                        "id": "6lyZRCHmL4",
                        "type": "list",
                        "data": {
                            "style": "unordered",
                            "meta": {},
                            "items": [
                                {
                                    "content": "Code in Github repository with downloadable ZIP files per section",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "Feel comfortable using the most commonly used features of the Angular framework",
                                    "meta": {},
                                    "items": []
                                }
                            ]
                        }
                    },
                    {
                        "id": "ScHrkQbhRl",
                        "type": "header",
                        "data": {
                            "text": "Are there any course requirements or prerequisites?",
                            "level": 4
                        }
                    },
                    {
                        "id": "FB1Ywa6ezE",
                        "type": "list",
                        "data": {
                            "style": "unordered",
                            "meta": {},
                            "items": [
                                {
                                    "content": "Just some HTML, CSS and Javascript",
                                    "meta": {},
                                    "items": []
                                }
                            ]
                        }
                    },
                    {
                        "id": "RRbZci1ywr",
                        "type": "header",
                        "data": {
                            "text": "Who this course is for:",
                            "level": 4
                        }
                    },
                    {
                        "id": "e-AvJVMxbc",
                        "type": "list",
                        "data": {
                            "style": "unordered",
                            "meta": {},
                            "items": [
                                {
                                    "content": "Developers looking to get started quickly in the Angular framework",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "Developers looking to learn first the most commonly used parts of Angular",
                                    "meta": {},
                                    "items": []
                                }
                            ]
                        }
                    }
                ],
                "version": "2.31.0-rc.7"
            },
            price: 39.99,
            rating: 4.8,
            students: 20000,
            lessons: 30,
            thumbnail: "https://source.unsplash.com/400x300/?python",
            categories: ["Programming"],
            instructor: "Jane Smith",
            level: "intermediate",
            language: "English",
            duration: 2000,
            requirements: ["Không cần kiến thức lập trình trước", "Cần có máy tính để thực hành"],
            whatYouWillLearn: [
                "Python Basics",
                "OOP",
                "Web Scraping",
                "Data Science",
                "Machine Learning với Python",
                "Xử lý dữ liệu với Pandas và NumPy",
                "Tạo API với Flask/Django"
            ],
            lastUpdated: "2025-01-20",
            contents: [
                {
                    sectionTitle: "Web Scraping and APIs",
                    lessons: [
                        {title: "Introduction to Web Scraping", duration: 2000},
                    ]
                },
                {
                    sectionTitle: "Machine Learning Basics",
                    lessons: [
                        {title: "Introduction to Machine Learning", duration: 2000},
                    ]
                },
                {
                    sectionTitle: "Building Web Applications",
                    lessons: [
                        {title: "Introduction to Flask", duration: 2000, freePreview: true},
                        {title: "Creating a REST API with Flask", duration: 2000},
                        {title: "Introduction to Django", duration: 2000}
                    ]
                }
            ]
        },
        {
            id: 3,
            title: "Fullstack Web Development",
            headline: "Khóa học phát triển web toàn diện",
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
            duration: 2000,
            requirements: ["Biết JavaScript cơ bản"],
            whatYouWillLearn: ["Frontend với React", "Backend với Node.js", "Database với MongoDB"],
            lastUpdated: "2025-02-05",
            contents: [
                {
                    sectionTitle: "Introduction",
                    lessons: [
                        {title: "What is Fullstack Development?", duration: 2000, freePreview: true},
                        {title: "Project Setup", duration: 2000}
                    ]
                }
            ]
        },
        // Tiếp tục tạo thêm khóa học khác...
    ];

    constructor(private router: Router) {
        for (let i = 4; i <= 30; i++) {
            this.courses.push({
                id: i,
                title: `Course ${i}`,
                headline: `Khóa học ${i} về công nghệ`,
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
                duration: 2000,
                requirements: [`Requirement for course ${i}`],
                whatYouWillLearn: [`Learning topic ${i}-1`, `Learning topic ${i}-2`],
                lastUpdated: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                contents: [
                    {
                        sectionTitle: `Introduction to Course ${i}`,
                        lessons: [
                            {title: `Lesson 1 of Course ${i}`, duration: 2000, freePreview: i % 3 === 0},
                            {title: `Lesson 2 of Course ${i}`, duration: 2000}
                        ]
                    }
                ]
            });
        }
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
