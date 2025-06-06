import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  newUser = {
    username: '',
    passwordHash: '',
    role: null,
    contact: {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      role: ''
    }
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  step: number = 1;
  totalSteps: number = 2;  // Nombre total d'étapes (modifiable si besoin)

  constructor(private apiService: ApiService) {}

  // Calcule le pourcentage d'avancement (pour la barre de progression)
  get progressPercent(): number {
    return (this.step / this.totalSteps) * 100;
  }

  nextStep() {
    this.errorMessage = null;

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

  registerUser() {
    this.successMessage = null;
    this.errorMessage = null;

    if (!this.newUser.contact.lastName || !this.newUser.contact.firstName || !this.newUser.contact.email) {
      this.errorMessage = 'Les champs Nom, Prénom et Email pour le contact sont obligatoires.';
      return;
    }

    this.apiService.postData('register', this.newUser).subscribe(
      response => {
        if (response && response.message) {
          if (response.message.includes('succès')) {
            this.successMessage = response.message;
            this.resetForm();
          } else {
            this.errorMessage = response.message;
          }
        } else {
          this.errorMessage = 'Une erreur inattendue est survenue. Veuillez réessayer.';
        }
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur', error);
        this.errorMessage = error.error?.message || 'Erreur lors de l\'enregistrement de l\'utilisateur. Veuillez réessayer.';
      }
    );
  }

  previousStep() {
    this.errorMessage = null;
    this.step = 1;
  }

  resetForm() {
    this.newUser = {
      username: '',
      passwordHash: '',
      role: null,
      contact: {
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        role: ''
      }
    };
    this.step = 1;
  }
}
