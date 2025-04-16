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
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CoursesService } from '../../courses/courses.service';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { Dialog } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { SelectButton } from 'primeng/selectbutton';
import { Editor } from 'primeng/editor';
import {QuizLessonComponent} from '../../quiz/quiz-lesson/quiz-lesson.component';
import {EditorComponent} from "../../../shared/components/editor/editor.component";
import {MessageService} from 'primeng/api';
import {finalize} from 'rxjs';
import {BaseComponent} from '../../../core/base.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
export class CourseEditComponent extends BaseComponent implements OnInit, AfterViewInit {
    @ViewChild('description') description!: EditorComponent;
    private courseService = inject(CoursesService);
    private messageService = inject(MessageService);
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router)
    courseForm!: FormGroup;
    loading = false;
    isNewCourse = false;
    courseId!: string;
    categories = [
    ];

    levels = [
        { name: 'Beginner', value: 'beginner' },
        { name: 'Intermediate', value: 'intermediate' },
        { name: 'Advanced', value: 'advanced' },
    ];
    descriptionData: any = undefined
    languages = [
        { name: 'English', value: 'en' },
        { name: 'Vietnamese', value: 'vi' },
    ];
    courseImageUrl!: string;
    courseImage!: File;
    courseContent: any[] = [
        {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "sectionTitle": "Chương 1: Giới thiệu",
            "lessons": [
                {
                    "id": "1f88f671-6762-4ccb-bd24-8e74e49b60c9",
                    "title": "Giới thiệu khóa học",
                    "duration": 120,
                    "freePreview": true,
                    "link": "https://example.com/lesson-1",
                    "type": "video"
                },
                {
                    "id": "c7b6fc55-0752-445c-8ffa-f2afe1c02dc2",
                    "title": "Tổng quan tài liệu",
                    "duration": 0,
                    "freePreview": false,
                    "link": "https://example.com/lesson-2",
                    "type": "document"
                }
            ]
        },
        {
            "id": "d438700b-9250-4f43-a2a9-9dfbabb611f2",
            "sectionTitle": "Chương 2: Cơ bản về HTML",
            "lessons": [
                {
                    "id": "da6cd6a6-0bdf-4666-8a7d-c862e2a11929",
                    "title": "HTML là gì?",
                    "duration": 180,
                    "freePreview": true,
                    "link": "https://example.com/lesson-3",
                    "type": "video"
                }
            ]
        }
    ];
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
    isCategoryDialogVisible = false;
    newCategory: string = '';
    constructor() {
        super()
        this.activatedRoute.url.subscribe((url: any) => {
            this.isNewCourse = url.find((segment: any) => segment.path === 'new') !== undefined;
            if (!this.isNewCourse) {
                this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId') || '';
            }
        })
    }

    ngOnInit() {
        this.courseForm = new FormGroup({
            title: new FormControl('', { validators: [Validators.required] }),
            headline: new FormControl('', { validators: [Validators.required] }),
            categories: new FormControl([], {
                validators: [Validators.required],
            }),
            level: new FormControl('', { validators: [Validators.required] }),
            language: new FormControl([], {
                validators: [Validators.required],
            }),
            price: new FormControl<number>(0, {
                validators: [Validators.required],
            }),
        });
        this.initData();
    }

    ngAfterViewInit() {
    }

    initData() {
        this.loading = true
        this.courseService.getAllCategories().pipe(
            finalize(() => {
                this.loading = false
            }),
            takeUntilDestroyed(this.destroyRef)
        )
            .subscribe((res: any) => {
                if (res) {
                    this.categories = res;
                    console.log(res);
                    if (this.courseId) {
                        this.initCourseData()
                    } else {
                        this.courseForm.setValue(
                            {
                                "title": "",
                                "headline": "",
                                "categories": [
                                    {
                                        "id": "6f1b8a4a-9ac0-44c5-84c8-234af5ea546f",
                                        "name": "Development"
                                    }
                                ],
                                "level": {
                                    "name": "Intermediate",
                                    "value": "intermediate"
                                },
                                "language": {
                                    "name": "English",
                                    "value": "en"
                                },
                                "price": 222
                            }
                        )
                    }
                }
            })
    }

    initCourseData() {
        this.loading = true
        this.courseService.getCourseById(this.courseId).pipe(
            finalize(() => {
                this.loading = false
            }),
            takeUntilDestroyed(this.destroyRef)
        )
            .subscribe((res: any) => {
                if (res) {
                    const _categories = this.categories.filter((category: any) => {
                        return res.categories.includes(category.name)
                    })
                    const _language = this.languages.find((language: any) => language.value === res.language);
                    const _level = this.levels.find((level: any) => level.value === res.level);
                    this.courseForm.patchValue({
                        ...res,
                        categories: _categories,
                        language: _language,
                        level: _level,
                    });
                    this.descriptionData = res.description;
                    this.courseImageUrl = res.image;
                }
            })
    }

    handleRemoveCategory(value: any) {
        this.courseForm
            .get('categories')
            ?.setValue(
                this.courseForm
                    .get('categories')!
                    .value.filter((category: any) => category.name !== value)
            );
    }

    handleCreateCourse(update: boolean = false) {
        if (this.courseForm.invalid) {
            return;
        }
        this.loading = true;
        const _categories = this.courseForm.get('categories')!.value.map((category: any) => category.name);
        this.description.getEditorContent().then((outputData) => {
            // const _outputData = JSON.stringify(outputData);
            const course = {
                ...this.courseForm.value,
                categories: _categories,
                language: this.courseForm.get('language')!.value.value,
                level: this.courseForm.get('level')!.value.value,
                description: outputData,
            }
            if (update) {
                this.updateCourse(course);
            } else {
                this.createCourse(course);
            }

        })
            .catch((error) => {
                console.log(error);
            })
    }

    createCourse(course: any) {
        this.courseService.createCourse(course)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((res: any) => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: `Course created successfully: ${res.title}, ${res.id}`});
                this.router.navigate(['/user/user-courses'])
            });
    }

    updateCourse(course: any) {
        this.courseService.updateCourse(course, this.courseId)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((res: any) => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: `Update course successfully: ${res.title}, ${res.id}`});
            });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.courseImageUrl = URL.createObjectURL(input.files[0]);
            this.courseImage = input.files[0];
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

    handleAddCategory() {
        if (!this.newCategory) {
            return;
        }
        this.loading = true;
        this.courseService.addCategory(this.newCategory)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((res: any) => {
            if (res) {
                this.messageService.add({severity: 'success', summary: 'Success', detail: `Category added successfully: ${res.name}, ${res.id}`});
                this.newCategory = '';
                this.isCategoryDialogVisible = false;
            }
        });
    }
}
