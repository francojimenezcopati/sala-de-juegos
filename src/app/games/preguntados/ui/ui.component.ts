import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-ui',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ui.component.html',
    styleUrls: ['./ui.component.css'],
})
export class UiComponent {
	constructor(){

	}
}
