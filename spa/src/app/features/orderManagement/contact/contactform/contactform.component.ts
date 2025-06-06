import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css'],
})
export class ContactformComponent {
  contact = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  get progressPercent(): number {
    return 100; // Pas d'étapes multiples, donc 100% dès le départ
  }

  submitContact() {
    this.errorMessage = null;

    if (!this.contact.firstName || !this.contact.lastName || !this.contact.email || !this.contact.phone || !this.contact.role) {
      this.errorMessage = 'Tous les champs obligatoires doivent être remplis.';
      return;
    }

    // Simuler un envoi (remplacer par ton appel API)
    console.log('Contact soumis :', this.contact);
    this.successMessage = 'Contact enregistré avec succès !';

    // Reset après soumission si tu veux
    this.contact = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
    };
  }
}
