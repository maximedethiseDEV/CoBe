import {MenuItem} from '@core/types';
import {LucideIconsList} from '@core/lists/lucide-icons.list';

export const MenuList: MenuItem[] = [
    {
        label: 'Visualiser le tableau de bord',
        role: ['ADMIN','USER'],
        icon: LucideIconsList.ChartLine,
        link: 'dashboard'
    },
    {
        label: 'Planifier les livraisons',
        role: ['ADMIN','USER'],
        icon: LucideIconsList.CalendarClock,
        link: 'schedule'
    },
    {
        label: 'Visualiser les données',
        role: ['ADMIN','USER'],
        icon: LucideIconsList.TextSearch,
        children: [
            {
                label: 'Adresses',
                role: ['ADMIN'],
                icon: LucideIconsList.MapPin,
                link: 'addresses'
            },
            {
                label: 'Chantiers',
                role: ['ADMIN','USER'],
                icon: LucideIconsList.TrafficCone,
                link: 'construction-sites'
            },
            {
                label: 'Clients',
                role: ['ADMIN'],
                icon: LucideIconsList.Sparkles,
                link: 'customers'
            },
            {
                label: 'Commandes',
                role: ['ADMIN','USER'],
                icon: LucideIconsList.Package,
                link: 'purchase-orders'
            },
            {
                label: 'Contacts',
                role: ['ADMIN','USER'],
                icon: LucideIconsList.CircleUserRound,
                link: 'contacts'
            },
            {
                label: 'Détails de livraison',
                role: ['ADMIN','USER'],
                icon: LucideIconsList.PackageSearch,
                link: 'shared-details'
            },
            {
                label: 'Entreprises',
                role: ['ADMIN','USER'],
                icon: LucideIconsList.Wallet,
                link: 'companies'
            },
            {
                label: 'Fournisseurs',
                role: ['ADMIN'],
                icon: LucideIconsList.Factory,
                link: 'material-suppliers'
            },
            {
                label: 'Livraisons',
                role: ['ADMIN','USER'],
                icon: LucideIconsList.PackageCheck,
                link: 'deliveries'
            },
            {
                label: 'Numéros de commande',
                role: ['ADMIN'],
                icon: LucideIconsList.Hash,
                link: 'delivery-order-numbers'
            },
            {
                label: 'Pays',
                role: ['ADMIN'],
                icon: LucideIconsList.Earth,
                link: 'countries'
            },
            {
                label: 'Produits',
                role: ['ADMIN'],
                icon: LucideIconsList.PackageOpen,
                link: 'products'
            },
            {
                label: 'Transporteurs',
                role: ['ADMIN'],
                icon: LucideIconsList.Truck,
                link: 'transport-suppliers'
            },
            {
                label: 'Villes',
                role: ['ADMIN'],
                icon: LucideIconsList.Building2,
                link: 'cities'
            }
        ]
    }
];
