import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface DashboardFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Liste des fonctionnalités - pour ajouter une nouvelle fonctionnalité,
  // ajoutez simplement un nouvel objet dans ce tableau
  features: DashboardFeature[] = [
    {
      id: 'commande',
      name: 'Commandes',
      description: 'Gérer les commandes clients et suivre leur statut',
      icon: '',
      route: '/commandes',
      color: '#54b14f'
    },
    {
      id: 'planning',
      name: 'Planning',
      description: 'Consulter et organiser le planning des activités',
      icon: '',
      route: '/planning',
      color: '#f39c12'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
