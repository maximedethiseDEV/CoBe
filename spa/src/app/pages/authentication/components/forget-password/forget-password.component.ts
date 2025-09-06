import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';

@Component({
  selector: 'app-forget-password',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        LucideAngularModule,
        RouterLink
    ],
  templateUrl: './forget-password.component.html'
})
export class ForgetPasswordComponent {
    public goHome = LucideIconsList.House;
    public successMessage: string|null = null;
    public errorMessage: string|null = null;
    private router: Router = inject(Router);
    form = new FormGroup({
        email: new FormControl('',[Validators.required,Validators.email])
    });

    sendEmail() {
        this.successMessage = null;
        this.errorMessage = null;

        if (this.form.invalid) {
            this.errorMessage = 'Veuillez saisir une adresse email valide.';
            return;
        }

        // Ici, vous pourrez appeler votre service d’envoi d’email.
        // Pour l’instant, on affiche simplement un message de succès.
        this.successMessage = 'Si un compte correspond à cet email, un lien de réinitialisation a été envoyé.';
        this.form.reset();
    }

    public goToLogin(): void {
        this.router.navigate(['']);
    }
}
