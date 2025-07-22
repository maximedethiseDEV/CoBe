import {Injectable, inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TitleStrategy, RouterStateSnapshot} from '@angular/router';
import {environment} from '@environment/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomTitleStrategy extends TitleStrategy {
    private readonly titleService: Title = inject(Title);

    override updateTitle(snapshot: RouterStateSnapshot): void {
        const pageTitle: string|undefined = this.buildTitle(snapshot);

        if (pageTitle) {
            const baseTitle: string = environment.applicationTitle;
            this.titleService.setTitle(`${baseTitle} – ${pageTitle}`);
        }
    }
}
