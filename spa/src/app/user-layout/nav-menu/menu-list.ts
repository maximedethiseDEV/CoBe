import { MenuItem } from './menu-item';
import {ICONS_LIST} from '../../core/lucide-icons-list';
import {Package} from 'lucide-angular';

export const MENU_LIST: MenuItem[] = [
  {
    label: 'Visualiser le tableau de bord',
    icon: ICONS_LIST.ChartLine,
    link: '/app/dashboard'
  },
  {
    label: 'Planifier les livraisons',
    icon: ICONS_LIST.CalendarClock,
    link: '/app/schedule'
  },
  {
    label: 'Visualiser les données',
    icon: ICONS_LIST.TextSearch,
    children: [
      {
        label: 'Commande',
        icon: ICONS_LIST.Package,
        link: '/app/add-order',
      },
      {
        label: 'Détails de livraison',
        icon: ICONS_LIST.PackageSearch,
        link: '',
      },
      {
        label: 'Produit',
        icon: ICONS_LIST.PackageOpen,
        link: '',
      },
      {
        label: 'Livraison',
        icon: ICONS_LIST.PackageCheck,
        link: '',
      },
      {
        label: 'Entreprise',
        icon: ICONS_LIST.Wallet,
        link: '',
      },
      {
        label: 'Transporteur',
        icon: ICONS_LIST.Truck,
        link: '',
      },
      {
        label: 'Fournisseur',
        icon: ICONS_LIST.Factory,
        link: '',
      },
      {
        label: 'Client',
        icon: ICONS_LIST.Sparkles,
        link: '',
      },
      {
        label: 'Chantier',
        icon: ICONS_LIST.TrafficCone,
        link: '',
      },
      {
        label: 'Numéro de commande',
        icon: ICONS_LIST.Hash,
        link: '',
      },
      {
        label: 'Contact',
        icon: ICONS_LIST.CircleUserRound,
        link: '/app/add-contact',
      },
      {
        label: 'Pays',
        icon: ICONS_LIST.Earth,
        link: '/app/add-country',
      },
      {
        label: 'Ville',
        icon: ICONS_LIST.Building2,
        link: '/app/add-city',
      },
      {
        label: 'Adresse',
        icon: ICONS_LIST.MapPin,
        link: '/app/read-address',
      }
    ]
  },
  {
    label: 'Ajouter des commandes',
    icon: ICONS_LIST.PackagePlus,
    link: '/app/add-order',
  },
  {
    label: 'Ajouter des données',
    icon: ICONS_LIST.CirclePlus,
    children: [
      {
        label: 'Commande',
        icon: ICONS_LIST.Package,
        link: '/app/add-order',
      },
      {
        label: 'Détails de livraison',
        icon: ICONS_LIST.PackageSearch,
        link: '',
      },
      {
        label: 'Produit',
        icon: ICONS_LIST.PackageOpen,
        link: '',
      },
      {
        label: 'Livraison',
        icon: ICONS_LIST.PackageCheck,
        link: '',
      },
      {
        label: 'Entreprise',
        icon: ICONS_LIST.Wallet,
        link: '',
      },
      {
        label: 'Transporteur',
        icon: ICONS_LIST.Truck,
        link: '',
      },
      {
        label: 'Fournisseur',
        icon: ICONS_LIST.Factory,
        link: '',
      },
      {
        label: 'Client',
        icon: ICONS_LIST.Sparkles,
        link: '',
      },
      {
        label: 'Chantier',
        icon: ICONS_LIST.TrafficCone,
        link: '',
      },
      {
        label: 'Numéro de commande',
        icon: ICONS_LIST.Hash,
        link: '',
      },
      {
        label: 'Contact',
        icon: ICONS_LIST.CircleUserRound,
        link: '/app/add-contact',
      },
      {
        label: 'Pays',
        icon: ICONS_LIST.Earth,
        link: '/app/add-country',
      },
      {
        label: 'Ville',
        icon: ICONS_LIST.Building2,
        link: '/app/add-city',
      },
      {
        label: 'Adresse',
        icon: ICONS_LIST.MapPin,
        link: '/app/add-address',
      }
    ]
  },
  {
    label: 'Envoyer les livraisons',
    icon: ICONS_LIST.Mail,
    link: '/app/dashboard'
  }
];
