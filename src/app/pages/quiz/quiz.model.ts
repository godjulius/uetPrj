export class Question {
    question: string;
    options: string[];
    correctAnswer: string | string[];
    type: 'single' | 'multi';

    constructor(question: string, options: string[], correctAnswer: string | string[], type: 'single' | 'multi') {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.type = type;
    }
}

export class Quiz {
    questionList: Question[];

    constructor() {
        this.questionList = [];
    }

    addQuestion(question: Question) {
        this.questionList.push(question);
    }

    getQuestions(): Question[] {
        return this.questionList;
    }
}
