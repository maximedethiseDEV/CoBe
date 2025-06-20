import {Component, OnInit} from '@angular/core';
import {LucideAngularModule, UserRoundPlus} from 'lucide-angular';
import {LucideIconsService} from '../../../core/api/lucide-icons.service';
import {TokenService} from '../../../core/auth/token.service';
import {AuthService} from '../../../core/auth/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements OnInit {

  firstName: string = '';
  activeMenu: string | null = null;

  Settings;
  CalendarClock;
  Handshake;
  ChartLine;
  LogOut;
  CirclePlus;

  constructor(
    private tokenService: TokenService,
    private lucideService: LucideIconsService,
    private AuthService: AuthService,
    private router: Router,
  ) {
    this.Settings = this.lucideService.getIcon('Settings');
    this.CalendarClock = this.lucideService.getIcon('CalendarClock');
    this.Handshake = this.lucideService.getIcon('Handshake');
    this.ChartLine = this.lucideService.getIcon('ChartLine');
    this.CirclePlus = this.lucideService.getIcon('CirclePlus');
    this.LogOut = this.lucideService.getIcon('LogOut');
  }

  ngOnInit(): void {
    this.firstName = this.tokenService.getFirstName();
  }

  get firstNameInitial(): string {
    return this.firstName.charAt(0).toUpperCase();
  }

  onLogout() {
    this.AuthService.logout();
    this.router.navigateByUrl('');
  }

  protected readonly UserRoundPlus = UserRoundPlus;
}
