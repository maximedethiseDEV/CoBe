import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TokenService} from '../auth/token.service';
import { EventSourcePolyfill } from 'event-source-polyfill';


@Injectable({
  providedIn: 'root'
})
export class SseService {
  private baseUrl = 'http://localhost:8080';

  constructor(private tokenService: TokenService) {}

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
          },
          withCredentials: true
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
}
