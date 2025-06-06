import { Component } from '@angular/core';
import {ContactformComponent} from './contactform/contactform.component';
import {ContactlistComponent} from './contactlist/contactlist.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ContactformComponent,
    ContactlistComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
