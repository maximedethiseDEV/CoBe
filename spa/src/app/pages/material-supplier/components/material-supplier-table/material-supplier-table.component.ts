import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {MaterialSupplierProvider} from '@core/providers';
import {MaterialSupplier} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-material-supplier-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class MaterialSupplierTableComponent extends BaseTableComponent<MaterialSupplier> implements OnInit {
    private materialSupplierProvider: MaterialSupplierProvider = inject(MaterialSupplierProvider);
    public labelHeader: string = 'Liste des fournisseurs';
    public iconHeader = LucideIconsList.Factory;
    public filterFields: string[] = [
        'companyName',
        'hasParent',
        'cityName',
        'postalCode',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'companyName',
            type:'text',
            translate: 'Nom',
            sort: true
        },
        {
            key: 'street',
            type:'text',
            translate: 'Rue',
            sort: true
        },
        {
            key: 'cityName',
            type:'text',
            translate: 'Ville',
            sort: true
        },
        {
            key: 'postalCode',
            type:'text',
            translate: 'Code postal',
            sort: true
        },
        {
            key: 'countryCode',
            type:'text',
            translate: 'Pays',
            sort: true
        },
        {
            key: 'hasParent',
            type:'text',
            translate: 'Sous-traitant',
            sort: true
        }
    ];

    protected fetchAll(): Observable<MaterialSupplier[]> {
        return this.materialSupplierProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.materialSupplierProvider.delete(id);
    }
}
