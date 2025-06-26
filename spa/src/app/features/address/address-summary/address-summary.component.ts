import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {LucideAngularModule} from 'lucide-angular';
import {Dialog} from 'primeng/dialog';
import { PrimeTemplate, MessageService } from 'primeng/api';
import {Toast} from 'primeng/toast';
import {ClipboardService} from '../../../core/service/clipboard.service';
import {ICONS_LIST} from '../../../core/lucide-icons-list';
import {ContactService} from '../../../core/service/contact.service';
import {ContactDto} from '../../../core/model/dto/contact.dto';


@Component({
  selector: 'app-contact-summary',
  imports: [
    Button,
    LucideAngularModule,
    Dialog,
    PrimeTemplate,
    Toast
  ],
  templateUrl: './address-summary.component.html'
})
export class AddressSummaryComponent {
  @Input() contact!: ContactDto;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() copyToForm = new EventEmitter<ContactDto>();
  protected readonly ICONS_LIST = ICONS_LIST;
  readonly CARD_STYLE = { width: '30%', height: '60%' };
  private clipboardService = inject(ClipboardService);

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
  ) {}

  onCopyIntoForm() {
    this.copyToForm.emit(this.contact);
    this.messageService.add({
      severity: 'info',
      summary: 'Copié',
      detail: 'Contact copié vers le formulaire',
      life: 2000
    });
    this.closeDialog();
  }

  onEdit() {
    this.onCopyIntoForm();
    this.closeDialog();
  }

  onDelete() {
    if (this.contact?.contactId) {
      this.contactService.deleteContact(this.contact.contactId).subscribe({
        next: () => {},
        error: (err) => {
          console.error('Erreur lors de la suppression du contact :', err);
        }
      });
    } else {
      console.warn('Aucun contact sélectionné pour la suppression');
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Supprimé',
      detail: 'Contact supprimé',
      life: 2000
    });
    this.closeDialog();
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  copyValue(value: string, label?: string) {
    this.clipboardService.copy(value, label);
  }
}
