import { MenuItem } from './menu-item';
import {ICONS_LIST} from '../../core/lucide-icons-list';

export const MENU_LIST: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: ICONS_LIST.ChartLine,
    link: '/app/dashboard'
  },
  {
    label: 'Planning',
    icon: ICONS_LIST.CalendarClock,
    link: '/app/schedule'
  },
  {
    label: 'Données',
    icon: ICONS_LIST.TextSearch,
    link: '/app/add',
    children: [
      {
        label: 'Commande',
        icon: ICONS_LIST.Handshake,
        link: '/app/add-order',
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
        link: '/app/add-country',
      },
      {
        label: 'Adresse',
        icon: ICONS_LIST.MapPin,
        link: '/app/add-address',
      },
      {
        label: 'Détails de livraison',
        icon: ICONS_LIST.PackageSearch,
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
        label: 'Produit',
        icon: ICONS_LIST.PackageOpen,
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
        label: 'Livraison',
        icon: ICONS_LIST.PackageCheck,
        link: '',
      }
    ]
  },
  {
    label: 'Commande',
    icon: ICONS_LIST.CirclePlus,
    link: '/app/add-order',
  },
  {
    label: 'Envoyer livraisons',
    icon: ICONS_LIST.Mail,
    link: '/app/dashboard'
  }
];
