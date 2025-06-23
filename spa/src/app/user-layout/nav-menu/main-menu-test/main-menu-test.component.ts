import {Component, EventEmitter, input, Input, OnInit, Output} from '@angular/core';
import {LucideAngularModule, LogOut } from 'lucide-angular';
import {TokenService} from '../../../core/auth/token.service';
import {AuthService} from '../../../core/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {MENU_LIST} from '../menu-list';
import {MenuItem} from '../menu-item';
import {SideMenuTestComponent} from '../side-menu-test/side-menu-test.component';

@Component({
  selector: 'app-main-menu-test',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
  ],
  templateUrl: './main-menu-test.component.html',
  styleUrl: './main-menu-test.component.css'
})
export class MainMenuTestComponent implements OnInit {
  firstName: string = '';
  protected readonly LogOut = LogOut;
  protected menuList = MENU_LIST;
  protected activeMenuItem!: MenuItem;

  @Output() menuSelected = new EventEmitter<MenuItem>();

  constructor(
    private tokenService: TokenService,
    private AuthService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.firstName = this.tokenService.getFirstName();
  }

  get firstNameInitial(): string {
    return this.firstName.charAt(0).toUpperCase();
  }

  onMenuItemClick(menuItem: MenuItem): void {
    this.menuSelected.emit(menuItem);
  }

  onLogout() {
    this.AuthService.logout();
    this.router.navigateByUrl('');
  }
}
