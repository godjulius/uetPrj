export class Question {
    questionName: string;
    options: string[];
    correctAnswer: number[];
    type: 'single' | 'multiple';

    constructor(questionName: string, options: string[], correctAnswer: number[], type: 'single' | 'multiple') {
        this.questionName = questionName;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.type = type;
    }
}

export class Quiz {
    title: string;
    questions: Question[];

    constructor() {
        this.title = '';
        this.questions = [];
    }

    addQuestion(question: Question) {
        this.questions.push(question);
    }

    getQuestions(): Question[] {
        return this.questions;
    }
}
