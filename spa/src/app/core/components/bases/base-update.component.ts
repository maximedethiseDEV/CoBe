import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LucideIconsList} from '@core/lists';
import {MessageService} from 'primeng/api';

@Component({
    template: ''
})
export abstract class BaseUpdateComponent {
    abstract featurePath: string;
    abstract labelHeader: string;
    formBuilder = inject(FormBuilder);
    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected router: Router = inject(Router);
    protected messageService: MessageService = inject(MessageService);
    protected params: Params;
    protected queryParams: Params;
    public entity: any;
    public form: FormGroup = new FormGroup({});
    public readonly iconHeader: any = LucideIconsList.SquarePen;

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
