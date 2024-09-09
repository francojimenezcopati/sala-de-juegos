import { Component, OnInit } from '@angular/core';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-auth-page',
    standalone: true,
    imports: [AuthFormComponent, RouterLink, FormsModule],
    templateUrl: './auth-page.component.html',
    styleUrl: './auth-page.component.css',
})
export class AuthPageComponent implements OnInit {
    authType?: 'login' | 'register';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.url.subscribe((urlSegment) => {
            this.authType =
                urlSegment[0].path === 'login' ? 'login' : 'register';
        });
    }
}
