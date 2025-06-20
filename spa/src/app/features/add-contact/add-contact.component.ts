import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactFormComponent} from './contact-form/contact-form.component';
import {ContactFinderComponent} from './contact-finder/contact-finder.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {distinctUntilChanged, map, Observable} from 'rxjs';
import {ContactDto} from '../../core/model/dto/contact.dto';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-add-contact',
  imports: [
    ContactFormComponent,
    ContactFinderComponent,
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent implements OnInit {

  @ViewChild('contactFinder') contactFinder!: ContactFinderComponent;

  contactForm: FormGroup;
  contactPreview$!: Observable<ContactDto>;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      role: ['']
    });
  }

  ngOnInit() {
    this.contactPreview$ = this.contactForm.valueChanges;

    this.contactForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(formValue => {
      if (this.contactFinder && this.contactFinder.dt) {
        this.contactFinder.dt.filters = {};

        Object.entries(formValue).forEach(([key, value]) => {
          if (value && typeof value === 'string' && value.trim() !== '') {
            this.contactFinder.dt.filter(value, key, 'contains');
          }
        });
      }
    });
  }
}
