import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { CommonModule } from '@angular/common'; // Importer CommonModule si nécessaire
import { ApiService } from '../../core/services/api/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajouter FormsModule ici
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser = {
    username: '',
    passwordHash: '',
    role: 'USER',
    contact: null
  };

  successMessage: string | null = null; // Message de succès
  errorMessage: string | null = null;   // Message d'erreur

  constructor(private apiService: ApiService) {}

  registerUser() {
    this.successMessage = null; // Réinitialiser les messages
    this.errorMessage = null;

    this.apiService.postData('register', this.newUser).subscribe(
      response => {
        // Vérifiez si la réponse contient les données attendues
        if (response && response.data) {
          console.log('Utilisateur enregistré avec succès', response);
          this.successMessage = 'Utilisateur enregistré avec succès.';
          this.newUser = {
            username: '',
            passwordHash: '',
            role: 'USER',
            contact: null
          };
        } else {
          // Si la réponse est inattendue, afficher un message d'erreur
          console.error('Réponse inattendue de l\'API', response);
          this.errorMessage = 'Une erreur inattendue est survenue. Veuillez réessayer.';
        }
      },
      error => {
        // Gérer les erreurs HTTP
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur', error);
        this.errorMessage = 'Erreur lors de l\'enregistrement de l\'utilisateur. Veuillez réessayer.';
      }
    );
  }
}
