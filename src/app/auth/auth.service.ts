import { Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from '@angular/fire/auth';

// interface ApiResponse {
// 	idToken: string; //	A Firebase Auth ID token for the authenticated user.
// 	email: string; //	The email for the authenticated user.
// 	refreshToken: string; //	A Firebase Auth refresh token for the authenticated user.
// 	expiresIn: string; //	The number of seconds in which the ID token expires.
// 	localId: string; //	The uid of the authenticated user.
// 	registered: boolean;
// }

// interface ApiPayload {
// 	email: string;
// 	password: string;
// 	returnSecureToken: boolean;
// }

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private auth: Auth) {}

    // Registro de usuarios
    public async register(email: string, password: string) {
        try {
            const user = await createUserWithEmailAndPassword(
                this.auth,
                email,
                password
            );
            return user;
        } catch (error) {
            return null;
        }
    }

    // Inicio de sesión
    public async login(email: string, password: string) {
        try {
            const user = await signInWithEmailAndPassword(
                this.auth,
                email,
                password
            );
            return user;
        } catch (error) {
            return null;
        }
    }

    // Cierre de sesión
    public logout() {
        return signOut(this.auth);
    }
}
