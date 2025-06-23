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
        console.log('❤️ [SSE] Heartbeat reçu:', msgEvent.data);
      });

      eventSource.onopen = () => {
        console.log('✅ [SSE] Connexion établie');
      };

      eventSource.onerror = error => {
        console.error('❌ [SSE] Erreur de connexion SSE:', error);
        if ((eventSource as any).readyState === EventSource.CLOSED) {
          console.warn('📴 [SSE] Flux fermé (readyState = CLOSED)');
        } else if ((eventSource as any).readyState === EventSource.CONNECTING) {
          console.warn('🔁 [SSE] Tentative de reconnexion (CONNECTING)');
        }
        observer.error(error);
        eventSource.close();
      };

      return () => {
        console.log('🔚 [SSE] Fermeture manuelle de la connexion');
        eventSource.close();
      };
    });
  }

  /*

  getServerSentEvents(entity: string): Observable<any> {
    return new Observable(observer => {
      const token = this.tokenService.getToken();

      if (!token) {
        observer.error(new Error('Aucun token disponible'));
        return;
      }

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
          try {
            const data = JSON.parse(msgEvent.data);
            observer.next({ eventType, payload: data });
          } catch (error) {
            console.error(`Erreur lors du parsing de l'événement ${eventType}:`, error);
          }
        };
      };

      eventSource.addEventListener('CREATE', handleEvent('CREATE') as  any);
      eventSource.addEventListener('UPDATE', handleEvent('UPDATE') as any);
      eventSource.addEventListener('DELETE', handleEvent('DELETE') as any);

      eventSource.addEventListener('HEARTBEAT', (event: any) => {
        const msgEvent = event as MessageEvent;
        console.log('Heartbeat reçu:', msgEvent.data);
      });

      eventSource.onerror = error => {
        console.error('Erreur de connexion SSE:', error);
        observer.error(error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    });
  }

   */
}
