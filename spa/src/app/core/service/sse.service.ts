import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TokenService} from '../auth/token.service';
import { EventSourcePolyfill } from 'event-source-polyfill';


@Injectable({
  providedIn: 'root'
})
export class SseService {
  private baseUrl = '/api';

  constructor(private tokenService: TokenService) {}

  getServerSentEvents(entity: string): Observable<any> {
    return new Observable(observer => {
      const token = this.tokenService.getToken();

      if (!token) {
        const msg = 'Aucun token disponible';
        console.error('❌ [SSE] ' + msg);
        observer.error(new Error(msg));
        return;
      }

      console.log(`🔌 [SSE] Connexion à /${entity}/subscribe avec token.`);

      const eventSource = new EventSourcePolyfill(
        `${this.baseUrl}/${entity}/subscribe`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const handleEvent = (eventType: string): EventListener => {
        return (event: Event) => {
          const msgEvent = event as MessageEvent;
          console.log(`📨 [SSE] Événement reçu: ${eventType}`, msgEvent.data);
          try {
            const data = JSON.parse(msgEvent.data);
            observer.next({ eventType, payload: data });
          } catch (error) {
            console.error(`❌ [SSE] Erreur de parsing JSON pour ${eventType}:`, error);
          }
        };
      };

      // Gérer les types d'événements
      eventSource.addEventListener('CREATE', handleEvent('CREATE') as any);
      eventSource.addEventListener('UPDATE', handleEvent('UPDATE') as any);
      eventSource.addEventListener('DELETE', handleEvent('DELETE') as any);
      eventSource.addEventListener('HEARTBEAT', (event: any) => {
        const msgEvent = event as MessageEvent;
      });

      eventSource.onopen = () => {
        console.log('✅ [SSE] Connexion établie');
      };

      eventSource.onerror = () => {
        console.log('🔁 [SSE] Tentative de reconnexion (CONNECTING)');
        // Laisser le navigateur gérer la reconnexion automatique (généralement après 3s)
      };

      return () => {
        console.log('🔚 [SSE] Fermeture manuelle de la connexion');
        eventSource.close();
      };
    });
  }
}
