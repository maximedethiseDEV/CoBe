import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EventSourcePolyfill} from 'event-source-polyfill';
import {environment} from '@environment/environment';
import {AuthenticationService} from '@core/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class SseService {
    private authenticationService: AuthenticationService = inject(AuthenticationService);

    public getServerSentEvents(entityName: string): Observable<any> {
        return new Observable(observer => {
            const token: string = this.authenticationService.getToken();

            if (!token) {
                const msg = 'Aucun token disponible';
                console.error('❌ [SSE] ' + msg);
                observer.error(new Error(msg));
                return;
            }

            console.log(`🔌 [SSE] Connexion à /${entityName}/subscribe avec token.`);

            const eventSource = new EventSourcePolyfill(
                `${environment.url.sse}/${entityName}/subscribe`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const handleEvent = (eventType: string): EventListener => {
                return (event: Event) => {
                    const messageEvent: MessageEvent = event as MessageEvent;
                    console.log(`📨 [SSE] Événement reçu: ${eventType}`, messageEvent.data);

                    try {
                        const data: any = JSON.parse(messageEvent.data);
                        observer.next({eventType, payload: data.payload});
                    } catch (error) {
                        console.error(`❌ [SSE] Erreur de parsing JSON pour ${eventType}:`, error);
                    }
                };
            };

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
                console.log('🔁 [SSE] Tentative de reconnexion');
            };

            return () => {
                console.log('🔚 [SSE] Fermeture manuelle de la connexion');
                eventSource.close();
            };
        });
    }
}
