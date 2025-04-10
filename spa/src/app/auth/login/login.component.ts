import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage = null;

    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response?.token && response?.roles) {
          // Nettoyer les rôles pour supprimer le préfixe "ROLE_"
          const cleanedRoles = response.roles
            .split(',')
            .map((role: string) => role.replace('ROLE_', ''));

          sessionStorage.setItem('app.token', response.token);
          sessionStorage.setItem('app.roles', cleanedRoles.join(',')); // Stocker les rôles nettoyés
          this.router.navigateByUrl('dashboard');
        } else {
          this.errorMessage = 'Connexion échouée. Jeton ou rôles non reçus.';
        }
      },
      error => {
        console.error('Erreur lors de la connexion', error);
        this.errorMessage = error.error?.message || 'Nom d\'utilisateur ou mot de passe incorrect.';
      }
    );
  }
}
