import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouletteComponent } from './roulette/roulette.component';
import { PreguntadosService } from '../preguntados.service';
import { QuestionUiComponent } from './question-ui/question-ui.component';
import { Question } from '../api.interfaces';

@Component({
    selector: 'app-ui',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouletteComponent,
        QuestionUiComponent,
    ],
    templateUrl: './ui.component.html',
    styleUrls: ['./ui.component.css'],
})
export class UiComponent {
    private preguntadosService = inject(PreguntadosService);

    // protected highScore!: number;
    // protected score: number = 0;

    protected question: Question | null = null;
    protected showQuestion = false;

    async ngOnInit() {}

    async onCategorySelected(selectedApiOption: string) {
        const question = await this.preguntadosService.getQuestion(
            selectedApiOption
        );
        this.question = question.questions[Math.floor(Math.random() * 10)];
    }

    onChangeToQuestion(change: boolean) {
        this.showQuestion = true;
    }

    onChangeQuestion(change: boolean) {
        this.showQuestion = false;
    }

    reset() {
        this.showQuestion = false;
        this.question = null;
    }
}
