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

  // Représentant un nouvel utilisateur avec ses données de contact
  newUser = {
    username: '',
    passwordHash: '',
    role: null,
    contact: {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',  // Optionnel
      role: ''    // Optionnel
    }
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {}

  registerUser() {
    this.successMessage = null;
    this.errorMessage = null;

    // Validation côté frontend pour l'utilisateur
    if (!this.newUser.username || this.newUser.username.length < 3) {
      this.errorMessage = 'Le nom d\'utilisateur doit contenir au moins 3 caractères.';
      return;
    }
    if (!this.newUser.passwordHash || this.newUser.passwordHash.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }

    // Validation côté frontend pour les informations de contact
    if (!this.newUser.contact.lastName || !this.newUser.contact.firstName || !this.newUser.contact.email) {
      this.errorMessage = 'Les champs Nom, Prénom et Email pour le contact sont obligatoires.';
      return;
    }

    // Appel à l'API pour enregistrer l'utilisateur avec ses données de contact
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

  // Réinitialisation du formulaire après succès
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
  }
}
