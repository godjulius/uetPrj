import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Checkbox} from 'primeng/checkbox';
import {RadioButton} from 'primeng/radiobutton';
import {ButtonDirective} from 'primeng/button';

@Component({
    selector: 'app-quiz-player',
    standalone: true,
    imports: [CommonModule, Checkbox, FormsModule, RadioButton, ReactiveFormsModule, ButtonDirective],
    templateUrl: './quiz-player.component.html',
    styleUrl: './quiz-player.component.css'
})
export class QuizPlayerComponent implements OnInit {
    @Input() quiz: any;
    quizForm!: FormGroup;

    currentIndex = -1;
    selectedAnswers: number[][] = [];
    isCompleted = false;
    score = 0;
    correctAnswers: number = 0;

    constructor(private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.quizForm = this.fb.group({
            questions: this.fb.array([])
        });

        this.quizForm.reset();
        this.patchQuizForm(this.quiz);
        this.selectedAnswers = this.quiz.questions.map(() => []);
    }

    patchQuizForm(quiz: any) {
        const questionsFG = quiz.questions.map((q: any) =>
            this.fb.group({
                submitAnswer: new FormControl(
                    q.type === 'single' ? null : [],
                    Validators.required
                )
            })
        );

        this.quizForm.setControl('questions', this.fb.array(questionsFG));
    }

    startQuiz() {
        this.currentIndex = 0;
        this.isCompleted = false;
        this.score = 0;
    }

    isOptionSelected(qIndex: number, optionIndex: number): boolean {
        const formArray = this.quizForm.get('questions') as any;
        const control = formArray.at(qIndex).get('submitAnswer');

        const value = control?.value;

        if (this.quiz.questions[qIndex].type === 'single') {
            return value === optionIndex;
        }

        if (Array.isArray(value)) {
            return value.includes(optionIndex);
        }

        return false;
    }

    nextQuestion() {
        if (this.currentIndex < this.quiz.questions.length - 1) {
            this.currentIndex++;
        }
    }

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }

    submitQuiz() {
        const formValue = this.quizForm.value;

        formValue.questions.forEach((q: any) => {
            q.submitAnswer = Array.isArray(q.submitAnswer)
                ? [...q.submitAnswer].sort()
                : [q.submitAnswer];
        });
        console.log('quizForm', this.quizForm.value);
        this.calculateScore();
        this.isCompleted = true;

    }

    calculateScore() {
        const answers = this.quizForm.value.questions;
        let score = 0;

        this.quiz.questions.forEach((q: { correctAnswer: number[]; }, i: number) => {
            const userAnswer = answers[i].submitAnswer;

            if (Array.isArray(userAnswer) &&
                userAnswer.sort().toString() === q.correctAnswer.sort().toString()) {
                score++;
            }

        });

        this.correctAnswers = score;
        this.score = Math.round((score / this.quiz.questions.length) * 100);
    }

    nextLesson() {

    }
}
