import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { AuthService } from './auth/auth.service';

import { User } from '@angular/fire/auth';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        AuthPageComponent,
        HomePageComponent,
        NavBarComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {}
