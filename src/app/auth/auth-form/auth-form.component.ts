import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-auth-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.css',
})
export class AuthFormComponent {
    @Input() authType?: 'login' | 'register';

    email: string = '';
    password: string = '';

    constructor(private router: Router, private authService: AuthService) {}

    public async onSubmit() {
        const user =
            this.authType === 'login'
                ? await this.authService.login(this.email, this.password)
                : await this.authService.register(this.email, this.password);

        if (user) {
            console.log('success');
            // Si el inicio de sesión es exitoso, redirige al usuario al home
            this.router.navigate(['/home']);
        } else {
            console.log('errorrrrrrrr');
        }
    }
}
