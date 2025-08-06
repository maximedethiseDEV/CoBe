import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '@core/services';

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        NgIf,
        RouterLink
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    private router: Router = inject(Router);
    private authenticationService: AuthenticationService = inject(AuthenticationService);
    public username: string = '';
    public password: string = '';
    public errorMessage: string|null = null;

    constructor() {}

    public onSubmit(): void {
        this.errorMessage = null;

        this.authenticationService.login(this.username, this.password).subscribe({
            next: () => {
                this.router.navigate(['hub', 'dashboard']);
            },
            error: (error: any) => {
                this.errorMessage = error.error?.message || 'Nom d\'utilisateur ou mot de passe incorrect.';
            }
        })
    }
}
