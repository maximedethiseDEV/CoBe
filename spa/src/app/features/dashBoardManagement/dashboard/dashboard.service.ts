import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getOrdersToPlan(): number {
    return 17; // à remplacer par un appel backend
  }

  getWeeklyOrders() {
    return [
      { day: 'Lun', count: 5 },
      { day: 'Mar', count: 8 },
      { day: 'Mer', count: 4 },
      { day: 'Jeu', count: 10 },
      { day: 'Ven', count: 3 },
      { day: 'Sam', count: 2 },
      { day: 'Dim', count: 1 }
    ];
  }

  getTopClients() {
    return [
      { name: 'Client A', country: 'Belgique', product: 'Produit X', orders: 12 },
      { name: 'Client B', country: 'France', product: 'Produit Y', orders: 9 },
      { name: 'Client C', country: 'Allemagne', product: 'Produit Z', orders: 7 },
      { name: 'Client D', country: 'Pays-Bas', product: 'Produit X', orders: 5 },
      { name: 'Client E', country: 'Belgique', product: 'Produit Y', orders: 4 }
    ];
  }
}
