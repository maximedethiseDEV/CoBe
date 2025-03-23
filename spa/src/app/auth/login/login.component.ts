import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';
import {FormsModule} from '@angular/forms';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    const loginData = { username: this.username, password: this.password };

    this.apiService.postData('login', loginData).subscribe(
      (response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token); // Stocker le jeton
          this.router.navigate(['/dashboard']); // Rediriger vers la page d'accueil ou une autre page
        } else {
          this.errorMessage = 'Connexion échouée. Jeton non reçu.';
        }
      },
      error => {
        console.error('Erreur lors de la connexion', error);
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
      }
    );
  }
}
