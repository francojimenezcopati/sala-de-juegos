import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';



export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService)
	const router = inject(Router)


    const isAuthenticated = authService.currentUserSig(); // Verifica si hay un usuario autenticado
    if (isAuthenticated === null || isAuthenticated === undefined) {
        // Si no está autenticado, redirige a la página de inicio de sesión
        router.navigate(['/auth/login']);
        return false; // Evita que se acceda a la ruta
    }
    return true; // Permite el acceso a la ruta
};
