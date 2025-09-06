import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {ProfileProvider} from '@core/providers';
import {Profile} from '@core/models/profile.model';

export const ProfileResolver: ResolveFn<Profile> = (_route: ActivatedRouteSnapshot): Observable<Profile> => {
    const profileProvider: ProfileProvider = inject(ProfileProvider);
    return profileProvider.get();
};
