import { Component } from '@angular/core';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {RouterOutlet} from '@angular/router';
import {MultipleRowTestComponent} from '../features/multiple-row-test/multiple-row-test.component';

@Component({
  selector: 'app-user-layout',
  imports: [
    NavBarComponent,
    RouterOutlet,
    MultipleRowTestComponent,
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
