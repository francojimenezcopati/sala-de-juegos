import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../api.interfaces';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-question-ui',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './question-ui.component.html',
    styleUrl: './question-ui.component.css',
})
export class QuestionUiComponent implements OnInit {
    @Input() public question!: Question;

    @Output() changeQuestion = new EventEmitter<boolean>();

    positionCorrectAnswer!: number;
    answers: string[] = [];

    answerSelected = false;

    ngOnInit() {
        if (this.question.format === 'boolean') {
            this.answers.push('Verdadero');
            this.answers.push('Falso');
        } else {
            const incorrectAnswers = this.question.incorrectAnswers;

            this.positionCorrectAnswer = Math.floor(
                Math.random() * (incorrectAnswers.length + 1)
            );

            const limit = incorrectAnswers.length + 1;

            for (let i = 0; i < limit; i++) {
                if (i === this.positionCorrectAnswer) {
                    this.answers.push(this.question.correctAnswers);
                } else {
                    this.answers.push(incorrectAnswers.pop()!);
                }
            }
        }
    }

    checkAnswer(selectedAnswer: string) {
        this.answerSelected = true;
        if (selectedAnswer === this.question.correctAnswers) {
            Swal.fire({
                title: "Correcto!",
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
            });
        } else {
            Swal.fire({
                title: "Mal",
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
            });
        }
    }

    onChangeQuestion() {
        this.changeQuestion.emit(true);
    }
}
