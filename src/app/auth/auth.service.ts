import { inject, Injectable, signal } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInterface } from './user.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    auth = inject(Auth);
    user$: Observable<User | null> = user(this.auth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined);

    constructor(private router: Router) {
        // Suscribirse a los cambios en el estado de autenticación
        this.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                const dateString = authUser.metadata.lastSignInTime;
                const dateLastLogin = new Date(dateString as string);
                this.currentUserSig.set({
                    email: authUser.email!,
                    username: authUser.displayName!,
                    lastLogin: dateLastLogin.toString(),
                });
                // Redireccionar si el usuario está autenticado
                this.router.navigateByUrl('/home', { replaceUrl: true });
            } else {
                this.currentUserSig.set(null);
            }
        });
    }

    // Registro de usuarios
    public async register(email: string, username: string, password: string) {
        const promise = createUserWithEmailAndPassword(
            this.auth,
            email,
            password
        ).then((res) => {
            updateProfile(res.user, { displayName: username });
        });
        return promise;
    }

    // Inicio de sesión
    public async login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    // Cierre de sesión
    logout() {
        return signOut(this.auth);
    }
}
