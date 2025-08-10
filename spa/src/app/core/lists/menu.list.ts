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
                link: 'shared-details'
            },
            {
                label: 'Produits',
                icon: LucideIconsList.PackageOpen,
                link: 'products'
            },
            {
                label: 'Livraisons',
                icon: LucideIconsList.PackageCheck,
                link: 'deliveries'
            },
            {
                label: 'Entreprises',
                icon: LucideIconsList.Wallet,
                link: 'companies'
            },
            {
                label: 'Transporteurs',
                icon: LucideIconsList.Truck,
                link: 'transport-suppliers'
            },
            {
                label: 'Fournisseurs',
                icon: LucideIconsList.Factory,
                link: 'material-suppliers'
            },
            {
                label: 'Clients',
                icon: LucideIconsList.Sparkles,
                link: 'customers'
            },
            {
                label: 'Chantiers',
                icon: LucideIconsList.TrafficCone,
                link: 'construction-sites'
            },
            {
                label: 'Numéros de commande',
                icon: LucideIconsList.Hash,
                link: 'delivery-order-numbers'
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
