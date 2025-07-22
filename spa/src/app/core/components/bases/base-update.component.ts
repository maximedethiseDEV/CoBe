import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {LucideIconsList} from '@core/lists';
import {MessageService} from 'primeng/api';

@Component({
    template: ''
})
export abstract class BaseUpdateComponent {
    abstract featurePath: string;
    abstract labelHeader: string;
    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected router: Router = inject(Router);
    protected messageService: MessageService = inject(MessageService);
    protected params: Params;
    protected queryParams: Params;
    public entity: any;
    public form: FormGroup = new FormGroup({});
    public readonly iconsList: any = LucideIconsList;
    public readonly iconHeader: any= this.iconsList.CircleUserRound;

    constructor() {
        this.entity = this.route.snapshot.data['entity'];
        this.params = this.route.snapshot.params;
        this.queryParams = this.route.snapshot.queryParams;
        this.form = this.generateForm();
        this.patchForm();
    }

    abstract generateForm(): FormGroup;

    abstract update(): void;

    public patchForm(): void {
        this.form.patchValue(this.entity);
    }

    public back(): void {
        this.router.navigate(['hub', this.featurePath], {queryParams: this.queryParams});
    }
}
