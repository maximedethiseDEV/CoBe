import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-contactlist',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css'
})
export class ContactlistComponent {

  contacts = [
    { firstName: 'Alice', lastName: 'Dupont', email: 'alice@example.com', phone: '123456789', role: 'Admin' },
    { firstName: 'Bob', lastName: 'Martin', email: 'bob@example.com', phone: '987654321', role: 'User' },
  ];

  selectedContact: any = null;

  selectContact(contact: any) {
    this.selectedContact = contact;
  }

  editContact() {
    if (this.selectedContact) {
      alert(`Modifier le contact : ${this.selectedContact.firstName} ${this.selectedContact.lastName}`);
      // Tu pourras plus tard router vers un formulaire d’édition ou ouvrir une modale
    } else {
      alert("Aucun contact sélectionné !");
    }
  }

  deleteContact() {
    if (this.selectedContact) {
      if (confirm(`Supprimer le contact : ${this.selectedContact.firstName} ${this.selectedContact.lastName} ?`)) {
        this.contacts = this.contacts.filter(c => c !== this.selectedContact);
        this.selectedContact = null;
      }
    } else {
      alert("Aucun contact sélectionné !");
    }
  }
}
