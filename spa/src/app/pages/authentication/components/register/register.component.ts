import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '@core/services';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';

@Component({
    selector: 'app-register',
    imports: [
        FormsModule,
        NgIf,
        LucideAngularModule,
        RouterLink
    ],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    public goHome = LucideIconsList.House;
    private router: Router = inject(Router);
    private authenticationService: AuthenticationService = inject(AuthenticationService);
    private totalSteps: number = 2;
    public newUser: any = {
        username: '',
        passwordHash: '',
        permission: null,
        contact: {
            lastName: '',
            firstName: '',
            email: '',
            phone: ''
        }
    };
    public successMessage: string|null = null;
    public errorMessage: string|null = null;
    public step: number = 1;

    constructor() {}

    get progressPercent(): number {
        return (this.step / this.totalSteps) * 100;
    }

    public nextStep(): void {
        if (!this.newUser.username || this.newUser.username.length < 3) {
            this.errorMessage = 'Le nom d\'utilisateur doit contenir au moins 3 caractères.';
            return;
        }

        if (!this.newUser.passwordHash || this.newUser.passwordHash.length < 6) {
            this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
            return;
        }

        this.step = 2;
    }

    public registerUser(): void {
        if (!this.newUser.contact.lastName || !this.newUser.contact.firstName || !this.newUser.contact.email) {
            this.errorMessage = 'Les champs Nom, Prénom et Email pour le contact sont obligatoires.';
            return;
        }

        this.authenticationService.register(this.newUser).subscribe({
            next: (response: {message: string}) => {
                this.successMessage = response.message || 'Inscription réussie.';
                this.resetForm();
                this.router.navigate(['']);
            },
            error: (error: any) => {
                this.errorMessage = error.error?.message || 'Une erreur est survenue.';
            }
        });
    }

    public previousStep(): void {
        this.step = 1;
    }

    private resetForm(): void {
        this.newUser = {
            username: '',
            passwordHash: '',
            permission: null,
            contact: {
                lastName: '',
                firstName: '',
                email: '',
                phone: ''
            }
        };

        this.step = 1;
    }

    public goToLogin(): void {
        this.router.navigate(['']);
    }
}
