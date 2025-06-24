import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable} from 'rxjs';
import {ProgressBarVerticalComponent} from '../../../shared/progress-bar-vertical/progress-bar-vertical.component';
import {LucideAngularModule} from 'lucide-angular';
import {ICONS_LIST} from '../../../core/lucide-icons-list';
import {MessageService} from 'primeng/api';
import {ContactDto} from '../../../core/model/dto/contact.dto';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    ProgressBarVerticalComponent,
    LucideAngularModule
  ],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  @Input() contactForm!: FormGroup;
  @Input() contactPreview$!: Observable<ContactDto>;
  @Output() contactCreated = new EventEmitter<void>();
  protected readonly ICONS_LIST = ICONS_LIST;
  iconHeader = ICONS_LIST.CircleUserRound;
  labelHeader = 'Nouveau contact';

  constructor(
    private contactService: ContactService,
    private messageService: MessageService
  ) {
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData: ContactDto = this.contactForm.value;
      this.contactService.createContact(contactData).subscribe({
        next: (response) => {
          this.contactForm.reset();
          this.contactCreated.emit();
        },
        error: (error) => {
          console.error('Erreur lors de la création du contact:', error);
        }
      });
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Enregistré',
      detail: 'Contact enregistré',
      life: 2000
    });
  }

  /*
    Progress-bar
   */
  get formData(): any {
    return this.contactForm ? this.contactForm.value : null;
  }
  get excludedFields(): string[] {
    return [];
  }
}
