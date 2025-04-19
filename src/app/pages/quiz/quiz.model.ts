export class Question {
    questionName: string;
    options: string[];
    correctAnswer: string | string[];
    type: 'single' | 'multi';

    constructor(questionName: string, options: string[], correctAnswer: string | string[], type: 'single' | 'multi') {
        this.questionName = questionName;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.type = type;
    }
}

export class Quiz {
    quizTitle: string;
    questions: Question[];

    constructor() {
        this.quizTitle = '';
        this.questions = [];
    }

    addQuestion(question: Question) {
        this.questions.push(question);
    }

    getQuestions(): Question[] {
        return this.questions;
    }
}
