import {Component, inject, OnInit} from '@angular/core';
import {PurchaseOrderProvider} from '@core/providers';
import {ChartData, ChartOptions} from '@core/types';
import {PurchaseOrder} from '@core/models';
import {UIChart} from 'primeng/chart';

@Component({
  selector: 'app-tonnage-by-customer-chart',
    imports: [
        UIChart
    ],
  templateUrl: './tonnage-by-customer-chart.component.html'
})
export class TonnageByCustomerChartComponent implements OnInit {
    private purchaseOrderProvider = inject(PurchaseOrderProvider);

    public data!: ChartData;
    public options!: ChartOptions;

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.purchaseOrderProvider.getAllNoPage().subscribe((orders: PurchaseOrder[]) => {
            const { startOfTomorrow, endOfTomorrow } = this.getTomorrowBounds();
            const { startOfYear, daysSinceStartOfYear } = this.getStartOfYear();

            // 1) Tonnage (quantityOrdered) par client pour demain
            const tonnageTomorrowByCustomer = new Map<string, number>();
            // 2) Tonnage cumulé depuis le 1er janvier par client (pour calcul de la moyenne/jour)
            const tonnageYtdByCustomer = new Map<string, number>();

            for (const o of orders) {
                const d = this.toDate(o.requestedDeliveryBegin);
                if (!d) continue;

                const qty = this.getOrderedQuantity(o);
                const customer = o.customerName || 'Client inconnu';

                // Cumule le YTD
                if (d >= startOfYear) {
                    tonnageYtdByCustomer.set(customer, (tonnageYtdByCustomer.get(customer) || 0) + qty);
                }

                // Cumule demain
                if (d >= startOfTomorrow && d <= endOfTomorrow) {
                    tonnageTomorrowByCustomer.set(customer, (tonnageTomorrowByCustomer.get(customer) || 0) + qty);
                }
            }

            // Ensemble des clients à afficher: union des clients ayant demain OU YTD
            const allCustomers = Array.from(new Set([
                ...Array.from(tonnageTomorrowByCustomer.keys()),
                ...Array.from(tonnageYtdByCustomer.keys())
            ])).sort((a, b) => a.localeCompare(b));

            const tomorrowData = allCustomers.map(c => tonnageTomorrowByCustomer.get(c) || 0);
            const averageData = allCustomers.map(c => {
                const total = tonnageYtdByCustomer.get(c) || 0;
                return daysSinceStartOfYear > 0 ? total / daysSinceStartOfYear : 0;
            });

            this.data = {
                labels: allCustomers,
                datasets: [
                    {
                        // @ts-ignore: label utilisé par Chart.js/PrimeNG
                        label: 'Tonnage demain',
                        data: tomorrowData,
                        backgroundColor: tomorrowData.map(() => 'hsl(210, 80%, 55%)'),
                        hoverBackgroundColor: tomorrowData.map(() => 'hsl(210, 80%, 60%)')
                    },
                    {
                        // @ts-ignore: label utilisé par Chart.js/PrimeNG
                        label: 'Moyenne quotidienne YTD',
                        data: averageData,
                        backgroundColor: averageData.map(() => 'hsl(30, 85%, 55%)'),
                        hoverBackgroundColor: averageData.map(() => 'hsl(30, 85%, 60%)')
                    }
                ]
            };

            // On veut un bar chart horizontal: indexAxis: 'y' (non typé dans ChartOptions local)
            this.options = ({
                cutout: '0%',
                plugins: {
                    legend: {
                        labels: {
                            color: '#000'
                        }
                    }
                },
                // @ts-ignore: propriété Chart.js non incluse dans le type local ChartOptions
                indexAxis: 'y'
            } as unknown) as ChartOptions;
        });
    }

    private getTomorrowBounds(): { startOfTomorrow: Date; endOfTomorrow: Date } {
        const now = new Date();
        const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
        const endOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59, 999);
        return { startOfTomorrow, endOfTomorrow };
    }

    private getStartOfYear(): { startOfYear: Date; daysSinceStartOfYear: number } {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
        // Nombre de jours écoulés depuis le 1er janvier (inclusif)
        const msPerDay = 24 * 60 * 60 * 1000;
        const daysSinceStartOfYear = Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999).getTime() - startOfYear.getTime()) / msPerDay) + 1;
        return { startOfYear, daysSinceStartOfYear };
    }

    private toDate(raw: string | null | undefined): Date | null {
        if (!raw) return null;
        const parsed = new Date(raw);
        return isNaN(parsed.getTime()) ? null : parsed;
    }

    private getOrderedQuantity(o: PurchaseOrder): number {
        const n = Number(o?.quantityOrdered ?? 0);
        return isNaN(n) ? 0 : n;
    }

}
