import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  // État qui contient l'identifiant du menu actif
  private activeMenuSubject = new BehaviorSubject<string | null>(null);

  // Observable public pour écouter les changements d'état
  public activeMenu$ = this.activeMenuSubject.asObservable();

  // Met à jour l'état du menu actif
  setActiveMenu(menuId: string | null): void {
    this.activeMenuSubject.next(menuId);
  }

  // Récupère l'état actif actuel
  getActiveMenu(): string | null {
    return this.activeMenuSubject.value;
  }
}
