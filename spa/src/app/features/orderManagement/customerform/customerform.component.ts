import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customerform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customerform.component.html',
  styleUrl: './customerform.component.css'
})
export class CustomerformComponent {
  step: number = 1;
  totalSteps: number = 2;

  successMessage = '';
  errorMessage = '';

  client = {
    company: {
      companyId: '',
      name: '',
      address: ''
    },
    customer: {
      customerId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    }
  };

  progressPercent = 0;

  nextStep() {
    if (this.step < this.totalSteps) {
      this.step++;
      this.updateProgress();
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
      this.updateProgress();
    }
  }

  updateProgress() {
    this.progressPercent = (this.step / this.totalSteps) * 100;
  }

  submitClient() {
    // Logique d’enregistrement ou d’appel API ici
    this.successMessage = 'Client enregistré avec succès !';
  }
}
