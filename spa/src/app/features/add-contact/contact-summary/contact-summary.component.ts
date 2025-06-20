import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactDto} from '../../../core/model/dto/contact.dto';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {ClipboardCheck, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-contact-summary',
  imports: [
    Card,
    Button,
    LucideAngularModule
  ],
  templateUrl: './contact-summary.component.html',
  styleUrl: './contact-summary.component.css'
})
export class ContactSummaryComponent {
  @Input() contact!: ContactDto;
  @Output() copyToForm = new EventEmitter<ContactDto>();
  protected readonly ClipboardCheck = ClipboardCheck;
}
