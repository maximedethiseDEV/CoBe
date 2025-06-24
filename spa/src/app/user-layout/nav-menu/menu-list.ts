import { MenuItem } from './menu-item';
import {ICONS_LIST} from '../../core/api/lucide-icons-list';

export const MENU_LIST: MenuItem[] = [
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
        icon: ICONS_LIST.UserRoundPlus,
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
      }
    ]
  },
  {
    label: 'Dashboard',
    icon: ICONS_LIST.ChartLine,
    link: '/app/dashboard'
  }
];
