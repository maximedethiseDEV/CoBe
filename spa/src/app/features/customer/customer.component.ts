import { Component } from '@angular/core';
import {CustomerFinderComponent} from './customer-finder/customer-finder.component';
import {CustomerFormComponent} from './customer-form/customer-form.component';

@Component({
  selector: 'app-customer',
  imports: [
    CustomerFinderComponent,
    CustomerFormComponent
  ],
  templateUrl: './customer.component.html'
})
export class CustomerComponent {

}
