import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Card} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {TextareaModule} from 'primeng/textarea';
import {InputNumber} from 'primeng/inputnumber';
import {MultiSelectModule} from 'primeng/multiselect';
import {Chip} from 'primeng/chip';
import {Select} from 'primeng/select';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CoursesService} from '../../courses/courses.service';
import {AccordionModule} from 'primeng/accordion';
import {FieldsetModule} from 'primeng/fieldset';
import {Dialog} from 'primeng/dialog';
import {StepperModule} from 'primeng/stepper';
import {QuizLessonComponent} from '../../courses/quiz-lesson/quiz-lesson.component';
import {EditorComponent} from "../../../shared/components/editor/editor.component";
import {MessageService} from 'primeng/api';
import {finalize, forkJoin, of} from 'rxjs';
import {BaseComponent} from '../../../core/base.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LessonComponentComponent} from './lesson-component/lesson-component.component';

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

        QuizLessonComponent,
        EditorComponent,
        LessonComponentComponent,
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
    categories = [];

    levels = [
        {name: 'Beginner', value: 'beginner'},
        {name: 'Intermediate', value: 'intermediate'},
        {name: 'Advanced', value: 'advanced'},
    ];
    descriptionData: any = undefined
    languages = [
        {name: 'English', value: 'en'},
        {name: 'Vietnamese', value: 'vi'},
    ];
    courseImageUrl!: string;
    courseImage!: File;
    courseContent: any[] = [];
    active = 0;
    // Edit Lesson dialog
    isLessonDialogVisible = false
    isQuizDialogVisible = false;
    isCategoryDialogVisible = false;
    newCategory: string = '';
    newLessonName: string = '';
    isAddingNewLesson = false;
    isAddingNewSection = false;
    newSectionName: string = '';
    lessonId: string = '';
    sectionId: string = '';

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
            title: new FormControl('', {validators: [Validators.required]}),
            headline: new FormControl('', {validators: [Validators.required]}),
            categories: new FormControl([], {
                validators: [Validators.required],
            }),
            level: new FormControl('', {validators: [Validators.required]}),
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
                    this.courseImageUrl = res.thumbnail;
                    this.courseContent = res.contents;
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
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Course created successfully: ${res.title}, ${res.id}`
                });
                this.router.navigate(['/user/user-courses'])
            });
    }

    updateCourse(course: any) {
        this.loading = true;

        const updateCourse$ = this.courseService.updateCourse(course, this.courseId);
        const uploadThumbnail$ = this.courseImage
            ? this.courseService.uploadCourseThumbnail(this.courseId, this.courseImage)
            : of(null);

        forkJoin({
            updateRes: updateCourse$,
            uploadRes: uploadThumbnail$
        }).pipe(
            finalize(() => {
                this.loading = false;
            }),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: ({updateRes, uploadRes}: { updateRes: any, uploadRes: any }) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Update course successfully: ${updateRes.title}, ${updateRes.id}`
                });
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Error updating course: ${error.message}`
                });
            }
        });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.courseImageUrl = URL.createObjectURL(input.files[0]);
            this.courseImage = input.files[0];
        }
    }

    handleAddLesson() {
        // this.isLessonDialogVisible = !this.isLessonDialogVisible;
        this.isAddingNewLesson = true;
    }

    handleSaveNewLesson(sectionId: string, sectionIndex: number) {
        console.log(this.newLessonName)
        if (!this.newLessonName) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please enter lesson name'});
            return;
        }
        this.loading = true;
        this.courseService.addLesson(sectionId, {
            title: this.newLessonName,
            type: 'video',
            freePreview: false,
            orderInSection: this.courseContent[sectionIndex].sectionContents.length + 1,
        }).pipe(
            takeUntilDestroyed(this.destroyRef),
            finalize(() => {
                this.loading = false;
            })
        )
            .subscribe((res: any) => {
                if (res) {
                    console.log(res);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Lesson added successfully: ${res.title}, ${res.id}`
                    });
                    if (sectionIndex !== -1) {
                        if (!this.courseContent[sectionIndex].sectionContents) {
                            this.courseContent[sectionIndex].sectionContents = [{lesson: res}];
                        } else {
                            this.courseContent[sectionIndex].sectionContents.push({lesson: res});
                        }
                    }
                    this.newLessonName = '';
                    this.isAddingNewLesson = false;
                }
            })
    }

    handleAddNewSection() {
        if (!this.newSectionName) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please enter section name'});
            return;
        }
        this.loading = true;
        this.courseService.addSection(this.courseId, {
            sectionTitle: this.newSectionName,
        })
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((res: any) => {
                if (res) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Section added successfully: ${res.sectionTitle}, ${res.id}`
                    });
                    this.courseContent.push(res);
                    this.active = this.courseContent.length - 1;
                    this.newSectionName = '';
                    this.isAddingNewSection = false;
                }
            })
    }

    toggleQuizDialog(sectionId: string) {
        console.log(sectionId);
        this.isQuizDialogVisible = !this.isQuizDialogVisible;
        if (this.isQuizDialogVisible) {
            this.sectionId = sectionId;
        } else {
            this.sectionId = '';
        }
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
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Category added successfully: ${res.name}, ${res.id}`
                    });
                    this.newCategory = '';
                    this.isCategoryDialogVisible = false;
                }
            });
    }
}
