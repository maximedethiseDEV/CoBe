import {Component, inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {LucideIconsList} from '@core/lists';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LucideIconData} from 'lucide-angular';

@Component({
    template: ''
})
export abstract class BaseCreateComponent {
    abstract featurePath: string;
    abstract labelHeader: string;
    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected router: Router = inject(Router);
    protected messageService: MessageService = inject(MessageService);
    protected params: Params;
    protected queryParams: Params;
    public form: FormGroup = new FormGroup({});
    public readonly iconHeader: any = LucideIconsList.CirclePlus;

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
