import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, Observable} from 'rxjs';
import { ContactDto } from '../../../core/model/dto/contact.dto';
import { ContactService } from '../../../core/service/contact.service';
import {ProgressBarVerticalComponent} from '../../../shared/progress-bar-vertical/progress-bar-vertical.component';
import {LucideAngularModule, UserRoundPlus} from 'lucide-angular';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    ProgressBarVerticalComponent,
    LucideAngularModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  @Input() contactForm!: FormGroup;
  @Input() contactPreview$!: Observable<ContactDto>;
  @Output() contactCreated = new EventEmitter<void>();

  constructor(private contactService: ContactService) {
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

  protected readonly UserRoundPlus = UserRoundPlus;
}
