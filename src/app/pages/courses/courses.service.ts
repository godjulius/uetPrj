import {inject, Injectable} from '@angular/core';
import {ICourse} from './courses.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {MessageService} from 'primeng/api';
import {ALL_CATEGORY, CATEGORY, COURSE} from '../../core/constants/api.const';

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
            name: "React for Beginners",
            description: "Học React từ cơ bản đến nâng cao với dự án thực tế.",
            price: 29.99,
            rating: 4.7,
            students: 15000,
            lessons: 25,
            image: "https://source.unsplash.com/400x300/?react",
            category: "Web Development",
            instructor: "John Doe",
            level: "Beginner",
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
            name: "Mastering Python",
            description: "Học Python từ cơ bản đến chuyên sâu, bao gồm AI và ML.",
            price: 39.99,
            rating: 4.8,
            students: 20000,
            lessons: 45,
            image: "https://source.unsplash.com/400x300/?python",
            category: "Programming",
            instructor: "Jane Smith",
            level: "Intermediate",
            language: "English",
            duration: "25h 45m",
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
            content: [
                {
                    sectionTitle: "Getting Started",
                    lessons: [
                        { title: "Introduction to Python", duration: "12m", freePreview: true },
                        { title: "Installing Python and IDE", duration: "20m" }
                    ]
                },
                {
                    sectionTitle: "Python Fundamentals",
                    lessons: [
                        { title: "Variables and Data Types", duration: "15m" },
                        { title: "Control Flow (if, else, loops)", duration: "25m" },
                        { title: "Functions and Modules", duration: "18m", freePreview: true }
                    ]
                },
                {
                    sectionTitle: "Object-Oriented Programming",
                    lessons: [
                        { title: "Classes and Objects", duration: "22m" },
                        { title: "Encapsulation, Inheritance, and Polymorphism", duration: "30m" }
                    ]
                },
                {
                    sectionTitle: "Working with Data",
                    lessons: [
                        { title: "Reading and Writing Files", duration: "15m" },
                        { title: "Working with JSON and CSV", duration: "20m" },
                        { title: "Using Pandas for Data Analysis", duration: "35m", freePreview: true }
                    ]
                },
                {
                    sectionTitle: "Web Scraping and APIs",
                    lessons: [
                        { title: "Introduction to Web Scraping", duration: "20m" },
                        { title: "Scraping with BeautifulSoup", duration: "25m" },
                        { title: "Making API Requests with Requests Library", duration: "18m" }
                    ]
                },
                {
                    sectionTitle: "Machine Learning Basics",
                    lessons: [
                        { title: "Introduction to Machine Learning", duration: "20m" },
                        { title: "Using scikit-learn for ML Models", duration: "30m" },
                        { title: "Building a Simple Linear Regression Model", duration: "25m" }
                    ]
                },
                {
                    sectionTitle: "Building Web Applications",
                    lessons: [
                        { title: "Introduction to Flask", duration: "20m", freePreview: true },
                        { title: "Creating a REST API with Flask", duration: "35m" },
                        { title: "Introduction to Django", duration: "30m" }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Fullstack Web Development",
            description: "Tạo website hoàn chỉnh với React, Node.js, MongoDB.",
            price: 49.99,
            rating: 4.9,
            students: 18000,
            lessons: 40,
            image: "https://source.unsplash.com/400x300/?web",
            category: "Web Development",
            instructor: "Mark Wilson",
            level: "Advanced",
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
                name: `Course ${i}`,
                description: `Khóa học số ${i} về công nghệ`,
                price: Math.floor(Math.random() * 50) + 10, // Giá từ 10-60 USD
                rating: Number((Math.random() * 2 + 3).toFixed(1)), // Rating từ 3.0 - 5.0
                students: Math.floor(Math.random() * 20000) + 1000, // Học viên từ 1000-21000
                lessons: Math.floor(Math.random() * 40) + 10, // Bài học từ 10-50
                image: `https://source.unsplash.com/400x300/?technology,${i}`,
                category: ["Web Development", "Data Science", "AI", "Mobile Development", "Cyber Security"][i % 5],
                instructor: `Instructor ${i}`,
                level: ["Beginner", "Intermediate", "Advanced"][i % 3] as "Beginner" | "Intermediate" | "Advanced",
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

    getCourseById1(index: number ): Observable<ICourse | null> {
        // @ts-ignore
        const course = this.courses[index] ?? null;
        return of(course);
    }

    getAllCategories() {
        return this.handleError(this.httpClient.get(`${this.baseUrl}${ALL_CATEGORY}`));
    }

    addCategory(newCategory: string) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${CATEGORY}`, { name: newCategory }));
    }

    handleError(observable: any) {
        return observable.pipe(
            catchError((error: any) => {
                console.log(error);
                return of(null);
            })
        );
    }

}
