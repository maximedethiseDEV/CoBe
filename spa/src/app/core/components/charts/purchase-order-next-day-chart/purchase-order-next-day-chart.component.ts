import {Component, inject, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {UIChart} from 'primeng/chart';
import {ChartData, ChartOptions} from '@core/types';
import {PurchaseOrderProvider} from '@core/providers';
import {PurchaseOrder} from '@core/models';

@Component({
  selector: 'app-purchase-order-next-day-chart',
    imports: [
        DecimalPipe,
        UIChart
    ],
  templateUrl: './purchase-order-next-day-chart.component.html'
})
export class PurchaseOrderNextDayChartComponent implements OnInit {
    private purchaseOrderProvider = inject(PurchaseOrderProvider);

    public tomorrowOrdersCount = 0;
    public ytdTonnageTons = 0;

    public nextDayData!: ChartData;
    public nextDayOptions!: ChartOptions;

    public ytdTonnageData!: ChartData;
    public ytdTonnageOptions!: ChartOptions;

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.purchaseOrderProvider.getAllNoPage().subscribe((orders: PurchaseOrder[]) => {
            this.tomorrowOrdersCount = this.computeTomorrowOrdersCount(orders);
            this.ytdTonnageTons = this.computeYtdTonnage(orders);

            this.buildNextDayChart();
            this.buildYtdTonnageChart();
        });
    }

    private computeTomorrowOrdersCount(orders: PurchaseOrder[]): number {
        const now = new Date();
        const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
        const endOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59, 999);

        return orders.filter((o) => {
            const date = this.getRequestedBegin(o);
            return date !== null && date >= startOfTomorrow && date <= endOfTomorrow;
        }).length;
    }

    private computeYtdTonnage(orders: PurchaseOrder[]): number {
        const year = new Date().getFullYear();
        const startOfYear = new Date(year, 0, 1, 0, 0, 0, 0);

        return orders.reduce((sum: number, o) => {
            const date = this.getRequestedBegin(o);
            if (date !== null && date >= startOfYear) {
                return sum + this.getOrderedQuantity(o);
            }
            return sum;
        }, 0);
    }

    // D’après le modèle PurchaseOrder
    private getRequestedBegin(o: PurchaseOrder): Date | null {
        const raw = o?.requestedDeliveryBegin;
        if (!raw) return null;
        const parsed = new Date(raw);
        return isNaN(parsed.getTime()) ? null : parsed;
    }

    private getOrderedQuantity(o: PurchaseOrder): number {
        const n = Number(o?.quantityOrdered ?? 0);
        return isNaN(n) ? 0 : n;
    }

    private buildNextDayChart(): void {
        const labels = ['Commandes (J+1)'];
        const value = Math.max(0, this.tomorrowOrdersCount);

        this.nextDayData = {
            labels,
            datasets: [
                {
                    data: [value],
                    backgroundColor: ['hsl(210, 80%, 55%)'],
                    hoverBackgroundColor: ['hsl(210, 80%, 60%)']
                }
            ]
        };

        this.nextDayOptions = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: '#000'
                    }
                }
            }
        };
    }

    private buildYtdTonnageChart(): void {
        const labels = ['Tonnage YTD'];
        const value = Math.max(0, this.ytdTonnageTons);

        this.ytdTonnageData = {
            labels,
            datasets: [
                {
                    data: [value],
                    backgroundColor: ['hsl(140, 70%, 45%)'],
                    hoverBackgroundColor: ['hsl(140, 70%, 55%)']
                }
            ]
        };

        this.ytdTonnageOptions = {
            cutout: '0%',
            plugins: {
                legend: {
                    labels: {
                        color: '#000'
                    }
                }
            }
        };
    }
}
