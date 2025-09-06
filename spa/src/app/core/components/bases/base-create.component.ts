import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {LucideIconsList} from '@core/lists';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    template: ''
})
export abstract class BaseCreateComponent {
    public readonly iconHeader: any = LucideIconsList.CirclePlus;
    route: ActivatedRoute = inject(ActivatedRoute);
    router: Router = inject(Router);
    messageService: MessageService = inject(MessageService);
    formBuilder = inject(FormBuilder);
    form!: FormGroup;
    params: Params;
    queryParams: Params;
    abstract featurePath: string;
    abstract labelHeader: string;


    constructor() {
        this.params = this.route.snapshot.params;
        this.queryParams = this.route.snapshot.queryParams;
        this.form = this.generateForm();
    }

    abstract generateForm(): FormGroup;

    abstract create(): void;

    public back(): void {
        this.router.navigate(['hub', this.featurePath], {queryParams: this.queryParams});
    }
}
