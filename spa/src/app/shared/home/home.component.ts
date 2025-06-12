import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from '../../auth/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    FormsModule,
    LoginComponent,
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
