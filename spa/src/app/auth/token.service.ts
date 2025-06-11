// token.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken(): string | null {
    const token = sessionStorage.getItem('app.token');
    return token;

  }

  // Décode le token JWT
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (Error) {
        console.error('Erreur lors du décodage du token :', Error);
        return null;
      }
    }
    return null;
  }

  // Obtenir une valeur spécifique dans les claims, comme le prénom
  getFirstName(): string {
    const decodedToken = this.decodeToken();
    return decodedToken?.sub || '';
  }
}
