import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {LucideAngularModule} from 'lucide-angular';
import {Dialog} from 'primeng/dialog';
import {PrimeTemplate, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {ClipboardService} from '../../../core/service/clipboard.service';
import {ICONS_LIST} from '../../../core/lucide-icons-list';
import {CityService} from '../../../core/service/city.service';
import {CityDto} from '../../../core/model/dto/city.dto';

@Component({
  selector: 'app-city-summary',
  imports: [
    Button,
    LucideAngularModule,
    Dialog,
    PrimeTemplate,
    Toast
  ],
  templateUrl: './city-summary.component.html'
})
export class CitySummaryComponent {
  @Input() city!: CityDto;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() copyToForm = new EventEmitter<CityDto>();
  protected readonly ICONS_LIST = ICONS_LIST;
  readonly CARD_STYLE = { width: '30%', height: '60%' };
  private clipboardService = inject(ClipboardService);

  constructor(
    private messageService: MessageService,
    private cityService: CityService
  ) {}

  onCopyIntoForm() {
    this.copyToForm.emit(this.city);
    this.messageService.add({
      severity: 'info',
      summary: 'Copié',
      detail: 'Ville copiée vers le formulaire',
      life: 2000
    });
    this.closeDialog();
  }

  onEdit() {
    this.onCopyIntoForm();
    this.closeDialog();
  }

  onDelete() {
    if (this.city?.cityId) {
      this.cityService.deleteCity(this.city.cityId).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Supprimé',
            detail: 'Ville supprimée avec succès',
            life: 2000
          });
          this.closeDialog();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la ville :', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de la suppression de la ville',
            life: 3000
          });
        }
      });
    } else {
      console.warn('Aucune ville sélectionnée pour la suppression');
    }
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  copyValue(value: string | undefined, label?: string) {
    if (value) {
      this.clipboardService.copy(value, label);
    }
  }
}
