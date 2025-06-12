import { Component } from '@angular/core';
import {ApiService} from '../../api/api.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Tout le reste du code reste inchangé
  newUser = {
    username: '',
    passwordHash: '',
    permission: null,
    contact: {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
    },
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  step: number = 1;
  totalSteps: number = 2;

  constructor(private apiService: ApiService, private router: Router) {}

  get progressPercent(): number {
    return (this.step / this.totalSteps) * 100;
  }

  nextStep() {
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
    if (!this.newUser.contact.lastName || !this.newUser.contact.firstName || !this.newUser.contact.email) {
      this.errorMessage = 'Les champs Nom, Prénom et Email pour le contact sont obligatoires.';
      return;
    }

    this.apiService.postData('register', this.newUser)
      .subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Inscription réussie.';
          this.resetForm();
          this.router.navigateByUrl('');
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Une erreur est survenue.';
        },
      });
  }

  previousStep() {
    this.step = 1;
  }

  resetForm() {
    this.newUser = {
      username: '',
      passwordHash: '',
      permission: null,
      contact: {
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
      },
    };
    this.step = 1;
  }
}
