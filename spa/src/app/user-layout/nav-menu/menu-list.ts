import { MenuItem } from './menu-item';
import {
  CalendarClock, Handshake, ChartLine, UserRoundPlus, Earth, Building2, MapPin, TextSearch
} from 'lucide-angular';

export const MENU_LIST: MenuItem[] = [
  {
    label: 'Planning',
    icon: CalendarClock,
    link: '/app/schedule'
  },
  {
    label: 'Données',
    icon: TextSearch,
    link: '/app/add',
    children: [
      {
        label: 'Commande',
        icon: Handshake,
        link: '/app/add-order',
      },
      {
        label: 'Contact',
        icon: UserRoundPlus,
        link: '/app/add-contact',
      },
      {
        label: 'Pays',
        icon: Earth,
        link: '/app/add-country',
      },
      {
        label: 'Ville',
        icon: Building2,
        link: '/app/add-country',
      },
      {
        label: 'Adresse',
        icon: MapPin,
        link: '/app/add-address',
      }
    ]
  },
  {
    label: 'Dashboard',
    icon: ChartLine,
    link: '/app/dashboard'
  }
];
