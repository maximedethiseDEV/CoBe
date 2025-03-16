import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  onLogin() {
    console.log('Login clicked');
  }

  onSignup() {
    console.log('Signup clicked');
  }
}
