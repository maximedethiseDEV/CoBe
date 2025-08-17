import {Component, inject, OnInit, output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MenuItem} from '@core/types';
import {LucideIconsList, MenuList} from '@core/lists';
import {AuthenticationService} from '@core/services';

@Component({
    selector: 'app-main-menu',
    imports: [
        LucideAngularModule,
        RouterLink
    ],
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent implements OnInit {
    private authenticationService: AuthenticationService = inject(AuthenticationService);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    private firstName: string = '';
    public readonly iconsList: any = LucideIconsList;
    public menuItems: MenuItem[] = [];
    public activeMenuItem!: MenuItem;
    protected menuSelected = output<MenuItem>();

    ngOnInit(): void {
        this.firstName = this.authenticationService.getFirstName();
        this.menuItems = this.filterMenuByRole(MenuList);
    }

    get firstNameInitial(): string {
        return this.firstName.charAt(0).toUpperCase();
    }

    public onMenuItemClick(menuItem: MenuItem): void {
        this.activeMenuItem = menuItem;

        if (!menuItem.children) {
            if (menuItem.link) {
                this.router.navigate([menuItem.link], {relativeTo: this.route});
            }
        } else {
            this.menuSelected.emit(menuItem);
        }
    }

    private filterMenuByRole(menu: MenuItem[]): MenuItem[] {
        return menu
            .filter(item =>
                item.role.length === 0 || this.authenticationService.hasRole(item.role)
            )
            .map(item => {
                const newItem = { ...item };
                if (newItem.children) {
                    newItem.children = this.filterMenuByRole(newItem.children);
                }
                return newItem;
            });
    }

    public onLogout() {
        this.authenticationService.logout();
        this.router.navigate(['']);
    }
}
