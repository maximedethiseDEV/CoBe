import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-wrapper',
    imports: [
        RouterOutlet
    ],
    templateUrl: './wrapper.component.html'
})
export class WrapperComponent {}
