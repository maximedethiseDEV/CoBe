import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api/api.service';

/**
 * The RegisterComponent is responsible for handling user registration functionality.
 * It allows users to input their username and password to create a new account,
 * and interacts with the backend API for registration operations. The component
 * also provides feedback to the user through success and error messages.
 *
 * Component Annotations:
 * - Selector: 'app-register'
 * - Standalone: True
 * - Imports Required: CommonModule, FormsModule
 * - Template: './register.component.html'
 * - Styles: './register.component.css'
 *
 * Properties:
 * - newUser: Represents the user object with fields for username, hashed password,
 *   role, and contact information. It resets upon successful registration.
 * - successMessage: Displays a message to the user when registration is successful.
 * - errorMessage: Displays a message to the user when registration fails or validation errors occur.
 *
 * Constructor:
 * - Accepts an instance of ApiService to facilitate communication with the backend.
 *
 * Methods:
 * - registerUser(): Performs user input validation, sends registration data to the backend API,
 *   and handles the response. Updates successMessage or errorMessage based on the operation result.
 *
 * Key Features:
 * - Client-side validation for username and password before making the API request.
 * - Displays appropriate success or error messages to guide the user's experience.
 * - Communicates with a backend API endpoint (e.g., 'register') via the postData function of ApiService.
 */
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
    contact: null
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {}

  registerUser() {
    this.successMessage = null;
    this.errorMessage = null;

    // Vérification supplémentaire côté frontend
    if (!this.newUser.username || this.newUser.username.length < 3) {
      this.errorMessage = 'Le nom d\'utilisateur doit contenir au moins 3 caractères.';
      return;
    }

    if (!this.newUser.passwordHash || this.newUser.passwordHash.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }

    this.apiService.postData('register', this.newUser).subscribe(
      response => {
        if (response && response.message) {
          if (response.message.includes('succès')) {
            this.successMessage = response.message;
            this.newUser = {
              username: '',
              passwordHash: '',
              role: null,
              contact: null
            };
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
}
