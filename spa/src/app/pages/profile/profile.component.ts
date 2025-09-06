import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Profile} from '@core/models/profile.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AsyncPipe, NgIf} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';

@Component({
  selector: 'app-profile',
    imports: [
        NgIf,
        AsyncPipe,
        LucideAngularModule
    ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
    private readonly route = inject(ActivatedRoute);
    public readonly profile$: Observable<Profile> = this.route.data.pipe(
        map(data => data['profile'] as Profile)
    );

    public readonly icons = {
        user: LucideIconsList.Users,
        mail: LucideIconsList.Mail,
        phone: LucideIconsList.Phone,
        role: LucideIconsList.BookmarkCheck,
        edit: LucideIconsList.SquarePen
    };

    public getInitials(p: Profile): string {
        const username = (p.username ?? '').trim();
        return username ? username.charAt(0).toUpperCase() : '?';
    }

}
