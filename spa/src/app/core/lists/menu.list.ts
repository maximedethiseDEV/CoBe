import {MenuItem} from '@core/types';
import {LucideIconsList} from '@core/lists/lucide-icons.list';

export const MenuList: MenuItem[] = [
    {
        label: 'Visualiser le tableau de bord',
        icon: LucideIconsList.ChartLine,
        link: 'dashboard'
    },
    {
        label: 'Planifier les livraisons',
        icon: LucideIconsList.CalendarClock,
        link: 'schedule'
    },
    {
        label: 'Visualiser les données',
        icon: LucideIconsList.TextSearch,
        children: [
            {
                label: 'Commandes',
                icon: LucideIconsList.Package,
                link: 'orders'
            },
            {
                label: 'Détails de livraison',
                icon: LucideIconsList.PackageSearch,
                link: ''
            },
            {
                label: 'Produits',
                icon: LucideIconsList.PackageOpen,
                link: ''
            },
            {
                label: 'Livraisons',
                icon: LucideIconsList.PackageCheck,
                link: ''
            },
            {
                label: 'Entreprises',
                icon: LucideIconsList.Wallet,
                link: ''
            },
            {
                label: 'Transporteurs',
                icon: LucideIconsList.Truck,
                link: ''
            },
            {
                label: 'Fournisseurs',
                icon: LucideIconsList.Factory,
                link: ''
            },
            {
                label: 'Clients',
                icon: LucideIconsList.Sparkles,
                link: ''
            },
            {
                label: 'Chantiers',
                icon: LucideIconsList.TrafficCone,
                link: ''
            },
            {
                label: 'Numéros de commande',
                icon: LucideIconsList.Hash,
                link: ''
            },
            {
                label: 'Contacts',
                icon: LucideIconsList.CircleUserRound,
                link: 'contacts'
            },
            {
                label: 'Pays',
                icon: LucideIconsList.Earth,
                link: 'countries'
            },
            {
                label: 'Villes',
                icon: LucideIconsList.Building2,
                link: 'cities'
            },
            {
                label: 'Adresses',
                icon: LucideIconsList.MapPin,
                link: 'addresses'
            }
        ]
    }
];
