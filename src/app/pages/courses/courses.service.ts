import { Injectable } from '@angular/core';
import {ICourse} from './courses.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
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
            lessons: 30,
            image: "https://source.unsplash.com/400x300/?python",
            category: "Programming",
            instructor: "Jane Smith",
            level: "Intermediate",
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
}

const courses: ICourse[] = [

]
