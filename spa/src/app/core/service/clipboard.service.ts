// clipboard.service.ts
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  private messageService = inject(MessageService);

  copy(value: string, label?: string): void {
    navigator.clipboard.writeText(value).then(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Copié',
        detail: `${label ?? 'Valeur'} copiée dans le presse-papiers`,
        life: 2000,
      });
    });
  }
}
