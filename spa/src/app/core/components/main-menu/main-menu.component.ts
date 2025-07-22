import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
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
    public readonly menuItems: MenuItem[] = MenuList;
    public activeMenuItem!: MenuItem;
    @Output() menuSelected: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

    ngOnInit(): void {
        this.firstName = this.authenticationService.getFirstName();
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


    public onLogout() {
        this.authenticationService.logout();
        this.router.navigate(['']);
    }
}
