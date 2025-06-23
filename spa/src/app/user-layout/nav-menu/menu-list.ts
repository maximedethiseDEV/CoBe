import { MenuItem } from './menu-item';
import {
  Settings,
  CalendarClock,
  Handshake,
  ChartLine,
  CirclePlus,
  UserRoundPlus
} from 'lucide-angular';

export const MENU_LIST: MenuItem[] = [
  {
    label: 'Planning',
    icon: CalendarClock,
    link: '/app/schedule'
  },
  {
    label: 'Ajouter',
    icon: CirclePlus,
    link: '/app/add',
    children: [
      {
        label: 'Commande',
        icon: Handshake,
        link: '/app/add-order',
        children: []
      },
      {
        label: 'Contact',
        icon: UserRoundPlus,
        link: '/app/add-contact',
        children: []
      }
    ]
  },
  {
    label: 'Dashboard',
    icon: ChartLine,
    link: '/app/dashboard'
  }
];
