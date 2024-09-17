import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-auth-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.css',
})
export class AuthFormComponent {
    @Input() authType?: 'login' | 'register';
    credentials: FormGroup;

    constructor(
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {
        this.credentials = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            username: ['', Validators.required],
        });
    }

    get email() {
        return this.credentials.get('email');
    }

    get password() {
        return this.credentials.get('password');
    }

    get username() {
        return this.credentials.get('username');
    }

    public async onSubmit() {
        if (this.authType === 'login') {
            this.login();
        } else {
            this.register();
        }
    }

    public async login() {
        this.authService
            .login(this.email?.value, this.password?.value)
            .then(() => {
                this.toastr.success('¡Inicio de sesión exitoso!');
                this.router.navigateByUrl('/home', { replaceUrl: true });
            })
            .catch((err) => {
                this.handleAuthError(err.code);
            });
    }

    public async register() {
        this.authService
            .register(
                this.email?.value,
                this.username?.value,
                this.password?.value
            )
            .then(() => {
                this.toastr.success('¡Usuario registrado!');
                this.router.navigateByUrl('/home', { replaceUrl: true });
            })
            .catch((err) => {
                this.handleAuthError(err.code);
            });
    }

    public fillInGuest(guest: 'guest' | 'admin') {
        if (guest === 'guest') {
            this.credentials.setValue({
                email: 'guest@guest.com',
                password: 'password',
				username: ''
            });
        } else {
            this.credentials.setValue({
                email: 'admin@admin.com',
                password: 'password',
				username: ''
            });
        }
    }

    private handleAuthError(errorCode: string) {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                this.toastr.error(
                    'El correo electrónico ya está en uso.',
                    'Error'
                );
                break;
            case 'auth/invalid-email':
                this.toastr.error(
                    'El correo electrónico no es válido.',
                    'Error'
                );
                break;
            case 'auth/invalid-credential':
                this.toastr.error('Email y/o contraseña incorrectos', 'Error');
                break;
            case 'auth/operation-not-allowed':
                this.toastr.error(
                    'Las cuentas de email/contraseña no están habilitadas.',
                    'Error'
                );
                break;
            case 'auth/weak-password':
                this.toastr.error('La contraseña es demasiado débil.', 'Error');
                break;
            case 'auth/user-disabled':
                this.toastr.error(
                    'La cuenta de usuario ha sido deshabilitada.',
                    'Error'
                );
                break;
            case 'auth/user-not-found':
                this.toastr.error(
                    'No existe un usuario con este correo electrónico.',
                    'Error'
                );
                break;
            case 'auth/wrong-password':
                this.toastr.error('La contraseña es incorrecta.', 'Error');
                break;
            case 'auth/too-many-requests':
                this.toastr.error(
                    'Demasiadas solicitudes. Intenta de nuevo más tarde.',
                    'Error'
                );
                break;
            default:
                this.toastr.error('Ocurrió un error desconocido.', 'Error');
                break;
        }
    }
}
