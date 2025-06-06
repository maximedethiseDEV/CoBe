import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private router: Router) {
  }

  onSignUp():void {
    this.router.navigateByUrl('register');
  }

  onSignIn():void {
    this.router.navigateByUrl('login');
  }
}
