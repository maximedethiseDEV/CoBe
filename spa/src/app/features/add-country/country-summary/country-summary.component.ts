import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {LucideAngularModule} from 'lucide-angular';
import {Dialog} from 'primeng/dialog';
import { PrimeTemplate, MessageService } from 'primeng/api';
import {Toast} from 'primeng/toast';
import {ClipboardService} from '../../../core/service/clipboard.service';
import {ICONS_LIST} from '../../../core/lucide-icons-list';
import {CountryService} from '../country.service';
import {CountryDto} from '../../../core/model/dto/country.dto';


@Component({
  selector: 'app-country-summary',
  imports: [
    Button,
    LucideAngularModule,
    Dialog,
    PrimeTemplate,
    Toast
  ],
  templateUrl: './country-summary.component.html'
})
export class CountrySummaryComponent {
  @Input() country!: CountryDto;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() copyToForm = new EventEmitter<CountryDto>();
  protected readonly ICONS_LIST = ICONS_LIST;
  readonly CARD_STYLE = { width: '30%', height: '60%' };
  private clipboardService = inject(ClipboardService);

  constructor(
    private messageService: MessageService,
    private countryService: CountryService
  ) {}

  onCopyIntoForm() {
    this.copyToForm.emit(this.country);
    this.messageService.add({
      severity: 'info',
      summary: 'Copié',
      detail: 'country copié vers le formulaire',
      life: 2000
    });
    this.closeDialog();
  }

  onEdit() {
    this.onCopyIntoForm();
    this.closeDialog();
  }

  onDelete() {
    if (this.country?.countryId) {
      this.countryService.deleteCountry(this.country.countryId).subscribe({
        next: () => {},
        error: (err) => {
          console.error('Erreur lors de la suppression du country :', err);
        }
      });
    } else {
      console.warn('Aucun country sélectionné pour la suppression');
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Supprimé',
      detail: 'country supprimé',
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
