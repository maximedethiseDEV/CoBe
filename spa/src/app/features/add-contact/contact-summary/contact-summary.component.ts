import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactDto} from '../../../core/model/dto/contact.dto';
import {Button} from 'primeng/button';
import {ClipboardCheck, LucideAngularModule} from 'lucide-angular';
import {Dialog} from 'primeng/dialog';
import { PrimeTemplate, MessageService } from 'primeng/api';
import {Toast} from 'primeng/toast';


@Component({
  selector: 'app-contact-summary',
  imports: [
    Button,
    LucideAngularModule,
    Dialog,
    PrimeTemplate,
    Toast
  ],
  templateUrl: './contact-summary.component.html',
  styleUrl: './contact-summary.component.css'
})
export class ContactSummaryComponent {
  @Input() contact!: ContactDto;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() copyToForm = new EventEmitter<ContactDto>();
  protected readonly ClipboardCheck = ClipboardCheck;

  readonly CARD_STYLE = { width: '30%', height: '60%' };

  constructor(
    private messageService: MessageService
  ) {}

  closeDialog() {
    this.visibleChange.emit(false);
  }

  onCopy() {
    this.copyToForm.emit(this.contact);
    this.messageService.add({
      severity: 'success',
      summary: 'Copié',
      detail: 'Contact copié vers le formulaire',
      life: 2000
    });
    this.closeDialog();
  }

  copyValue(value: string, label?: string) {
    navigator.clipboard.writeText(value).then(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Copié',
        detail: `${label ?? 'Valeur'} copiée dans le presse-papiers`,
        life: 2000
      });
    });
  }
}
