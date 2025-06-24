import {Component, EventEmitter,OnInit, Output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {TokenService} from '../../../core/auth/token.service';
import {AuthService} from '../../../core/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {MenuItem} from '../menu-item';
import {ICONS_LIST} from '../../../core/api/lucide-icons-list';
import {MENU_LIST} from '../menu-list';

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
  protected readonly ICONS_LIST = ICONS_LIST;
  protected readonly MENU_LIST = MENU_LIST;
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
