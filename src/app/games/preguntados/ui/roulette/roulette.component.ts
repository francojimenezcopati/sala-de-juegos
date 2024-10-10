import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-roulette',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './roulette.component.html',
    styleUrls: ['./roulette.component.css'],
})
export class RouletteComponent {
    options = [
        'Corona',
        'Entretenimiento',
        'Arte',
        'Deportes',
        'Historia',
        'Ciencia',
        'Geografía',
    ];
    apiOptions = [
        'entertainment',
        'arts%26literature',
        'sports%26leisure',
        'history',
        'science%26nature',
        'geography',
    ];

    @Output() categorySelected = new EventEmitter<string>();
    @Output() changeToQuestion = new EventEmitter<boolean>();

    selectedApiOption: string | null = null;

    selectedOptionIndex: number | null = null;
    rotationDegrees: number = 0;
    isSpinning = false;

    // Función que elige una opción al azar
    selectRandomOption() {
        this.selectedOptionIndex = Math.floor(
            Math.random() * this.options.length
        );
    }

    // Función para iniciar el giro de la ruleta
    spinWheel() {
        if (this.isSpinning) return; // Prevenir que se gire más de una vez a la vez

        this.isSpinning = true;
        this.selectRandomOption();

        // Calcular cuántos grados tiene que girar cada opción
        const segmentAngle = 360 / this.options.length;
        // Mínimo de 4 vueltas completas
        const minRotation = 360 * 4;
        // Calcular a qué ángulo corresponde la opción seleccionada
        const finalRotation =
            minRotation + this.selectedOptionIndex! * segmentAngle;
        // Animar el giro en CSS
        this.rotationDegrees = finalRotation;

        // Esperar a que termine la animación (4 segundos aprox.)
        setTimeout(async () => {
            this.isSpinning = false;
            const selectedOption = this.options[this.selectedOptionIndex!];

            if (selectedOption === 'Corona') {
                // Si sale Corona, permitir al jugador elegir una categoría
                Swal.fire({
                    title: 'Corona!',
                    text: 'Selecciona la categoría que prefieras:',
                    icon: 'info',
                    input: 'select',
                    inputOptions: {
                        Entretenimiento: 'Entretenimiento',
                        Arte: 'Arte',
                        Deportes: 'Deportes',
                        Historia: 'Historia',
                        Ciencia: 'Ciencia',
                        Geografía: 'Geografía',
                    },
                    inputPlaceholder: 'Selecciona una categoría',
                    showCancelButton: false,
                    confirmButtonText: 'Elegir',
                    confirmButtonColor: '#3085d6',
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            if (value) {
                                resolve(null); // Si hay valor, se habilita el botón de confirmación
                            } else {
                                resolve('Debes elegir una categoría'); // Deshabilita el botón si no se selecciona nada
                            }
                        });
                    },
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const selectedCategoryIndex = this.options.findIndex(
                            (option) => option === result.value
                        );

                        this.selectedApiOption =
                            this.apiOptions[selectedCategoryIndex - 1];

                        // Emito evento para el output
                        this.categorySelected.emit(this.selectedApiOption);

                        await Swal.fire({
                            title: `Has seleccionado: ${result.value}`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#3085d6',
                        });

                        this.changeToQuestion.emit(true);
                    }
                });
            } else {
                this.selectedApiOption =
                    this.apiOptions[this.selectedOptionIndex! - 1];

                // Emito evento para el output
                this.categorySelected.emit(this.selectedApiOption);

                await Swal.fire({
                    title: selectedOption,
                    icon: 'info',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                });

                this.changeToQuestion.emit(true);
            }
        }, 4000);
    }
}
