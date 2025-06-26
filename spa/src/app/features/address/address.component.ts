import {Component} from '@angular/core';
import {AddressFinderComponent} from './address-finder/address-finder.component';
import {AddressFormComponent} from './address-form/address-form.component';

@Component({
  selector: 'app-add-address',
  imports: [
    AddressFinderComponent,
    AddressFormComponent
  ],
  templateUrl: './address.component.html'
})
export class AddressComponent {

}
