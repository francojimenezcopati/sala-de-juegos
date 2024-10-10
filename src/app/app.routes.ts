import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home-page/home-page.component').then(
                (m) => m.HomePageComponent
            ),
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./auth/auth-page/auth-page.component').then(
                        (m) => m.AuthPageComponent
                    ),
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./auth/auth-page/auth-page.component').then(
                        (m) => m.AuthPageComponent
                    ),
            },
        ],
    },
    {
        path: 'about-me',
        loadComponent: () =>
            import('./about-me/about-me.component').then(
                (m) => m.AboutMeComponent
            ),
    },
    {
        path: 'chat',
        loadComponent: () =>
            import('./chat/chat-page/chat-page.component').then(
                (m) => m.ChatPageComponent
            ),
        canActivate: [authGuard],
    },

    {
        path: 'games',
        children: [
            {
                path: 'ahorcado',
                loadComponent: () =>
                    import('./games/ahorcado/ui/ui.component').then(
                        (m) => m.UiComponent
                    ),
            },
            {
                path: 'higher-or-lower',
                loadComponent: () =>
                    import('./games/higher-or-lower/ui/ui.component').then(
                        (m) => m.UiComponent
                    ),
            },
            {
                path: 'preguntados',
                loadComponent: () =>
                    import('./games/preguntados/ui/ui.component').then(
                        (m) => m.UiComponent
                    ),
            },
            {
                path: 'wordle',
                loadComponent: () =>
                    import('./games/wordle/ui/ui.component').then(
                        (m) => m.UiComponent
                    ),
            },
        ],
        canActivate: [authGuard],
    },

    //
    //
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '**',
        loadComponent: () =>
            import('./error-page/error-page.component').then(
                (m) => m.ErrorPageComponent
            ),
    },
];
