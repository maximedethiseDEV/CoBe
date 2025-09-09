import {Component, inject, OnInit} from '@angular/core';
import {DeliveryProvider} from '@core/providers';
import {Delivery, EntityModel} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {BaseTableComponent} from '@core/components';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-delivery-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: './delivery-table.component.html'
})
export class DeliveryTableComponent extends BaseTableComponent<Delivery> implements OnInit {
    private deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    public readonly labelHeader: string = 'Liste des livraisons';
    public readonly iconHeader = LucideIconsList.PackageCheck;
    public readonly sendIcon: any = LucideIconsList.Mail;

    public filterFields: string[] = [
        'actualDeliveryBegin',
        'actualDeliveryEnd',
        'quantity',
        'status',
        'orderId',
        'transportSupplierId',
        'deliveryOrderNumberId',
    ];

    public tableColumns: TableColumn[] = [
        {
            key: 'actualDeliveryBegin',
            type:'date',
            translate: 'Début de livraison',
            sort: true
        },
        {
            key: 'actualDeliveryEnd',
            type:'date',
            translate: 'Fin de livraison',
            sort: true
        },
        {
            key: 'quantity',
            type:'text',
            translate: 'Quantité',
            sort: true
        },
        {
            key: 'status',
            type:'text',
            translate: 'Statut',
            sort: true
        },
        {
            key: 'orderId',
            type:'uuid',
            translate: 'Numéro de commande',
            sort: true
        },
        {
            key: 'transportSupplierId',
            type:'uuid',
            translate: 'Transporteur',
            sort: true
        },
        {
            key: 'deliveryOrderNumberId',
            type:'uuid',
            translate: 'Numéro de chargement',
            sort: true
        }
    ];

    override ngOnInit(): void {
        this['tableActions'] = ['create', 'send', 'update', 'delete'];
        super.ngOnInit();
    }

    protected fetchAll(): Observable<Delivery[]> {
        return this.deliveryProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.deliveryProvider.delete(id);
    }

    // Implémentation locale et explicite de l'action "Envoyer"
    public sendEntity(entity: Delivery): void {
        const id = (entity as EntityModel).id;
        this.deliveryProvider.sendEmail(id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Envoyé',
                    detail: 'Livraison envoyé au transporteur',
                    life: 2000
                });
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Echec',
                    detail: 'Echec de l\'envoi du mail',
                    life: 2000
                });
            }
        });
    }
}
