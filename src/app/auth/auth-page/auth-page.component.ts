import { Component } from '@angular/core';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-auth-page',
    standalone: true,
    imports: [AuthFormComponent, RouterLink, FormsModule ],
    templateUrl: './auth-page.component.html',
    styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
    email: string = '';
    password: string = '';

    constructor(private router: Router) {}

    onSubmit() {
        // Aquí puedes agregar la lógica para manejar el inicio de sesión
        console.log('Correo:', this.email);
        console.log('Contraseña:', this.password);

        // Si el inicio de sesión es exitoso, redirigir al usuario a otra página
        // this.router.navigate(['/home']);
    }
}
