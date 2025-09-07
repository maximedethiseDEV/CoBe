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
            type:'text',
            translate: 'Début de livraison',
            sort: true
        },
        {
            key: 'actualDeliveryEnd',
            type:'text',
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
            type:'text',
            translate: 'Numéro de commande',
            sort: true
        },
        {
            key: 'transportSupplierId',
            type:'text',
            translate: 'Transporteur',
            sort: true
        },
        {
            key: 'deliveryOrderNumberId',
            type:'text',
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
                // TODO: afficher un toast de succès si vous avez un service de notification
                // this.toast.success('Email envoyé');
            },
            error: (error: Error) => {
                console.error('Impossible d\'envoyer l\'email :', error);
                // TODO: afficher un toast d'erreur
            }
        });
    }
}
