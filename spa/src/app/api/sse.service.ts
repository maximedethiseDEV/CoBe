import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  constructor(private ngZone: NgZone) {}

  connect(userId: string, token: string): Observable<any> {
    return new Observable((observer) => {
      if (!token) {
        observer.error('Aucun jeton trouvé pour la connexion SSE.');
        return;
      }

      // URL du backend pour la connexion SSE
      const url = `http://localhost:8080/subscribe?userId=${userId}`;

      // Utiliser fetchEventSource pour connecter avec les en-têtes personnalisés
      fetchEventSource(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onmessage: (event) => {
          this.ngZone.run(() => {
            const data = JSON.parse(event.data);
            observer.next(data);
          });
        },
        onerror: (error) => {
          this.ngZone.run(() => {
            observer.error(error);
          });
        },
        openWhenHidden: true, // Ajoute une option pour maintenir la connexion même si l'onglet est caché
      });

      // Gestion lors de la fin de l'abonnement
      return () => {
        observer.complete();
        // fetchEventSource ne nécessite pas explicitement de méthode `close`.
        // Cependant, si le serveur ferme la connexion SSE, cela sera proprement géré.
      };
    });
  }
}
