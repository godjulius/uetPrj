import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { Chip } from 'primeng/chip';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../../courses/courses.service';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { Dialog } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { SelectButton } from 'primeng/selectbutton';
import { Editor } from 'primeng/editor';
import {QuizLessonComponent} from '../../quiz/quiz-lesson/quiz-lesson.component';
import {EditorComponent} from "../../../shared/components/editor/editor.component";

@Component({
    selector: 'app-course-edit',
    standalone: true,
    imports: [
        CommonModule,
        Card,
        InputTextModule,
        FormsModule,
        TextareaModule,
        InputNumber,
        MultiSelectModule,
        Chip,
        ReactiveFormsModule,
        Select,
        ButtonModule,
        RouterLink,
        AccordionModule,
        FieldsetModule,
        Dialog,
        StepperModule,
        SelectButton,
        Editor,
        QuizLessonComponent,
        EditorComponent,
    ],
    templateUrl: './course-edit.component.html',
    styleUrl: './course-edit.component.css',
})
export class CourseEditComponent implements OnInit, AfterViewInit {
    @ViewChild('description') description!: EditorComponent;
    private courseService = inject(CoursesService);
    courseForm!: FormGroup;
    loading = false;
    categories = [
        { name: 'Development', value: 'development' },
        { name: 'Business', value: 'business' },
        { name: 'Design', value: 'design' },
        { name: 'Marketing', value: 'marketing' },
        { name: 'IT & Software', value: 'it-software' },
        { name: 'Personal Development', value: 'personal-development' },
        { name: 'Music', value: 'music' },
        { name: 'Lifestyle', value: 'lifestyle' },
        { name: 'Photography', value: 'photography' },
        { name: 'Health & Fitness', value: 'health-fitness' },
        { name: 'Language', value: 'language' },
        { name: 'Test Prep', value: 'test-prep' },
        { name: 'Office Productivity', value: 'office-productivity' },
        { name: 'Teacher Training', value: 'teacher-training' },
        { name: 'Academics', value: 'academics' },
        { name: 'Social Science', value: 'social-science' },
    ];

    levels = [
        { name: 'Beginner', value: 'beginner' },
        { name: 'Intermediate', value: 'intermediate' },
        { name: 'Advanced', value: 'advanced' },
    ];
    descriptionData: any = {
        "time": 1742198284048,
        "blocks": [
            {
                "id": "z_pmw_AjTq",
                "type": "header",
                "data": {
                    "text": "Requirements",
                    "level": 2
                }
            },
            {
                "id": "Ltof83GZXH",
                "type": "list",
                "data": {
                    "style": "unordered",
                    "meta": {},
                    "items": [
                        {
                            "content": "No programming experience needed - I'll teach you everything you need to know",
                            "meta": {},
                            "items": []
                        },
                        {
                            "content": "A Mac or PC computer with access to the internet",
                            "meta": {},
                            "items": []
                        },
                        {
                            "content": "No paid software required - I'll teach you how to use PyCharm, Jupyter Notebooks and Google Colab",
                            "meta": {},
                            "items": []
                        },
                        {
                            "content": "I'll walk you through, step-by-step how to get all the software installed and set up",
                            "meta": {},
                            "items": []
                        }
                    ]
                }
            },
            {
                "id": "racr8iTTDg",
                "type": "header",
                "data": {
                    "text": "Description",
                    "level": 2
                }
            },
            {
                "id": "QWQjlNVxAJ",
                "type": "paragraph",
                "data": {
                    "text": "Welcome to the 100 Days of Code - The Complete Python Pro Bootcamp,&nbsp;the only course you need&nbsp;to learn to code with Python. With over 500,000&nbsp;5 STAR reviews&nbsp;and a 4.8 average, my courses are some of the HIGHEST&nbsp;RATED courses in the history of Udemy!&nbsp;&nbsp;"
                }
            },
            {
                "id": "InbLXVrpXc",
                "type": "paragraph",
                "data": {
                    "text": "100 days, 1 hour per day, learn to build 1 project per day, this is how you master Python."
                }
            },
            {
                "id": "K15GxS3noD",
                "type": "paragraph",
                "data": {
                    "text": "At 60+ hours, this Python course is without a doubt the&nbsp;most comprehensive&nbsp;Python course available anywhere online. Even if you have&nbsp;zero&nbsp;programming experience, this course will take you from&nbsp;beginner to professional. Here's why:"
                }
            },
            {
                "id": "QtMz0uHDYP",
                "type": "list",
                "data": {
                    "style": "unordered",
                    "meta": {},
                    "items": [
                        {
                            "content": "The course is taught by the&nbsp;lead instructor&nbsp;at the App Brewery, London's&nbsp;best in-person programming Bootcamp.",
                            "meta": {},
                            "items": []
                        },
                        {
                            "content": "The course has been updated and you'll be learning the latest tools and technologies used at large companies such as Apple, Google and Netflix.",
                            "meta": {},
                            "items": []
                        },
                        {
                            "content": "This course doesn't cut any corners, there are beautiful&nbsp;animated explanation videos&nbsp;and tens of&nbsp;real-world projects&nbsp;which you will get to build. e.g. Tinder auto swiper, Snake game, Blog Website, LinkedIn Auto Submit Job Application",
                            "meta": {},
                            "items": []
                        },
                        {
                            "content": "The curriculum was developed over a period of&nbsp;2 years, with comprehensive student testing and feedback.",
                            "meta": {},
                            "items": []
                        },
                        {
                            "content": "We've taught over 600,000 students how to code and many have gone on to&nbsp;change their lives&nbsp;by becoming professional developers or starting their own tech startup.",
                            "meta": {},
                            "items": []
                        },
                        {
                            "content": "You'll save yourself&nbsp;over $12,000&nbsp;by enrolling, and still get access to the same teaching materials and learn from the same instructor and curriculum as our in-person programming Bootcamp.",
                            "meta": {},
                            "items": []
                        },
                        {
                            "content": "The course is&nbsp;constantly updated&nbsp;with new content, with new projects and modules determined by students - that's you!",
                            "meta": {},
                            "items": []
                        }
                    ]
                }
            },
            {
                "id": "j-5J_x787F",
                "type": "paragraph",
                "data": {
                    "text": "We'll take you&nbsp;step-by-step&nbsp;through engaging video tutorials and teach you everything you need to know to succeed as a Python developer."
                }
            },
            {
                "id": "NwYhdzDSFf",
                "type": "paragraph",
                "data": {
                    "text": "The course includes over&nbsp;65 hours&nbsp;of HD video tutorials and builds your programming knowledge while making real-world Python projects."
                }
            }
        ],
        "version": "2.31.0-rc.7"
    }
    languages = [
        { name: 'English', value: 'en' },
        { name: 'Vietnamese', value: 'vi' },
        { name: 'French', value: 'french' },
        { name: 'German', value: 'german' },
        { name: 'Italian', value: 'italian' },
        { name: 'Portuguese', value: 'portuguese' },
        { name: 'Russian', value: 'russian' },
        { name: 'Dutch', value: 'dutch' },
        { name: 'Japanese', value: 'japanese' },
        { name: 'Chinese', value: 'chinese' },
        { name: 'Arabic', value: 'arabic' },
        { name: 'Turkish', value: 'turkish' },
    ];
    courseImageUrl!: string;
    courseImage!: File;
    courseContent: any[] = [1, 2, 3, 4, 5];
    active = 1;
    // Edit Lesson dialog
    isLessonDialogVisible = false;
    isQuizDialogVisible = false;
    lessionOptions: any[] = [
        { label: 'Video', value: 'video' },
        { label: 'Document', value: 'document' },
    ];
    typeOfNewLesson: string = 'video';
    documentContent: string = '';
    currentStep = 1;
    constructor() {}

    ngOnInit() {
        this.courseForm = new FormGroup({
            title: new FormControl('', { validators: [Validators.required] }),
            category: new FormControl([], {
                validators: [Validators.required],
            }),
            level: new FormControl('', { validators: [Validators.required] }),
            languages: new FormControl([], {
                validators: [Validators.required],
            }),
            price: new FormControl<number>(0, {
                validators: [Validators.required],
            }),
        });
        this.courseForm.setValue(
            {
                "title": "React for Beginners",
                "category": [
                    {
                        "name": "Development",
                        "value": "development"
                    },
                    {
                        "name": "IT & Software",
                        "value": "it-software"
                    }
                ],
                "level": {
                    "name": "Beginner",
                    "value": "beginner"
                },
                "languages": [
                    {
                        "name": "Vietnamese",
                        "value": "vi"
                    },
                    {
                        "name": "English",
                        "value": "en"
                    }
                ],
                "price": 123
            }
        )
    }

    ngAfterViewInit() {
    }

    changeCategories() {
        console.log(this.courseForm.get('category')!.value);
    }

    handleRemoveCategory(value: any) {
        console.log(value);
        this.courseForm
            .get('category')
            ?.setValue(
                this.courseForm
                    .get('category')!
                    .value.filter((category: any) => category.value !== value)
            );
        console.log(this.courseForm.get('category')!.value);
    }

    handleCreateCourse() {
        this.description.getEditorContent().then((outputData) => {
            const course = {
                ...this.courseForm.value,
                level: this.courseForm.get('level')!.value.value,
                description: outputData,
            }
            console.log('Dữ liệu đã lưu:', course);
        })
            .catch((error) => {
                console.log('Lỗi khi lưu dữ liệu:', error);
            })
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.courseImageUrl = URL.createObjectURL(input.files[0]);
            this.courseImage = input.files[0];
            console.log(this.courseImage);
        }
    }

    toggleCreateLessonDialog() {
        this.isLessonDialogVisible = !this.isLessonDialogVisible;
    }

    handleCreateLesson() {
        console.log(this.documentContent);
    }

    clearLessonForm() {
        this.typeOfNewLesson = 'video';
        this.documentContent = '';
        this.currentStep = 1;
    }

    toggleQuizDialog() {
        this.isQuizDialogVisible = !this.isQuizDialogVisible;
    }

}
