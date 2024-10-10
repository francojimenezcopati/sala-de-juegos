export interface Question {
    id: string;
    category: string;
    format: string;
    question: string;
    correctAnswers: string;
    incorrectAnswers: string[];
}

export interface ApiResponse {
    questions: Question[];
    total: number;
    page: number;
    perPage: number;
}
