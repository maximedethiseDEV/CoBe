import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    this.errorMessage = null;

    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response?.token && response?.roles) {

          const cleanedRoles = response.roles
            .split(',')
            .map((role: string) => role.replace('ROLE_', ''));

          this.authService.setToken(response.token);

          sessionStorage.setItem('app.roles', cleanedRoles.join(','));

          this.router.navigateByUrl('/app/dashboard').then(success => {
            if (!success) {
              console.error('La redirection vers /app/dashboard a échoué');
            }
          }).catch(error => {
            console.error('Erreur lors de la redirection :', error);
          });


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
