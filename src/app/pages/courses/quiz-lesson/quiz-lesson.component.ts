import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Question, Quiz} from '../quiz.model';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Checkbox} from 'primeng/checkbox';
import {RadioButton} from 'primeng/radiobutton';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {SelectButton} from 'primeng/selectbutton';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BaseComponent} from '../../../core/base.component';
import {CoursesService} from '../courses.service';

@Component({
    selector: 'app-quiz-lesson',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, Checkbox, RadioButton, InputText, Textarea, Button, Dialog, SelectButton, Toast],
    templateUrl: './quiz-lesson.component.html',
    styleUrl: './quiz-lesson.component.css'
})
export class QuizLessonComponent extends BaseComponent implements OnInit {
    @Input() visible = false;
    @Input() sectionId: string = '';
    @Input() orderInSection: number = 0;
    @Output() visibleChange = new EventEmitter<boolean>();
    @ViewChildren('questionContainer') questionContainers!: QueryList<ElementRef>;

    quizForm!: FormGroup;
    quiz: Quiz;

    active = 0;

    typeOptions: any[] = [
        {label: 'Single', value: 'single'},
        {label: 'Multi', value: 'multiple'},
    ];

    constructor(private fb: FormBuilder, private messageService: MessageService, private coursesService: CoursesService) {
        super()
        this.quiz = new Quiz();
    }

    ngOnInit() {
        this.quizForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            questions: this.fb.array([this.createQuestionForm()], Validators.required)
        });
    }

    get questions(): FormArray {
        return this.quizForm.get('questions') as FormArray;
    }

    createQuestionForm(): FormGroup {
        const questionForm = this.fb.group({
            questionName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
            type: ['single', Validators.required],
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
            correctAnswer: new FormControl([], Validators.required)
        });

        questionForm.get('type')?.valueChanges
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((type) => {
                questionForm.get('correctAnswer')?.setValue([]);
            });

        return questionForm;
    }

    setActiveQuestion(index: number) {
        this.active = index;
        this.scrollToQuestion(index);
    }

    addQuestion() {
        this.questions.push(this.createQuestionForm());
        setTimeout(() => {
            this.scrollToQuestion(this.questions.length - 1);
        }, 50);
        this.active = this.questions.length - 1;
    }

    removeQuestion(index: number) {
        this.questions.removeAt(index);
    }

    isFieldInvalid(field: string, index?: number): boolean {
        let control;
        if (index !== undefined) {
            control = this.quizForm.get(`questions.${index}.${field}`);
        } else {
            control = this.quizForm.get(field);
        }
        return control!.invalid && (control!.dirty || control!.touched);
    }

    submitQuiz() {
        if (this.quizForm.invalid) {
            console.log('Invalid Form');
            this.quizForm.markAllAsTouched();
            const hasMissingCorrectAnswer = this.questions.controls.some((question) =>
                !question.get('correctAnswer')?.value.length
            );

            if (hasMissingCorrectAnswer) {
                this.messageService.add({
                    severity: 'error',
                    detail: 'Please select the correct answer for all questions!',
                });
                return;
            }
            return;
        }

        const formValue = this.quizForm.value;

        this.quiz.title = formValue.title;

        formValue.questions.forEach((q: any) => {
            const options = [q.answer1, q.answer2, q.answer3, q.answer4];
            let sortedCorrectAnswer = Array.isArray(q.correctAnswer)
                ? [...q.correctAnswer].sort()
                : [q.correctAnswer];

            const newQuestion = new Question(q.questionName, options, sortedCorrectAnswer, q.type);
            this.quiz.addQuestion(newQuestion);
        });

        const quizData = {
            ...this.quiz,
            orderInSection: this.orderInSection + 1
        }

        console.log('quizData', quizData);
        this.coursesService.addQuiz(this.sectionId, quizData)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((res: any) => {
                console.log("quiz", res);
            });
        // console.log('Quiz Created:', this.quiz);
        this.clearData();
    }

    closeDialog() {
        this.clearData();
    }

    clearData() {
        this.quizForm.reset();
        this.quizForm.setControl('questions', this.fb.array([this.createQuestionForm()]));
        this.active = 0;
        this.visibleChange.emit(false);
    }

    scrollToQuestion(index: number) {
        setTimeout(() => {
            const dialog = document.querySelector('p-dialog .p-dialog-content');
            const questionElement = this.questionContainers.toArray()[index]?.nativeElement;

            if (dialog && questionElement) {
                dialog.scrollTo({
                    top: questionElement.offsetTop - 205,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}
