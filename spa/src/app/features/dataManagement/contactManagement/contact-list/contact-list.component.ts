import { Component } from '@angular/core';
import {ContactComponent} from '../contact/contact.component';

@Component({
  selector: 'app-contact-list',
  imports: [
    ContactComponent
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {

}
