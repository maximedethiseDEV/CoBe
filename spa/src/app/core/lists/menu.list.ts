import {MenuItem} from '@core/types';
import {LucideIconsList} from '@core/lists/lucide-icons.list';

export const MenuList: MenuItem[] = [
    {
        label: 'Visualiser le tableau de bord',
        role: ['ADMIN','USER','SUPER_ADMIN'],
        icon: LucideIconsList.ChartLine,
        link: 'dashboard'
    },
    {
        label: 'Planifier les livraisons',
        role: ['ADMIN','USER','SUPER_ADMIN'],
        icon: LucideIconsList.CalendarClock,
        link: 'schedule'
    },
    {
        label: 'Piloter les données',
        role: ['ADMIN','USER','SUPER_ADMIN'],
        icon: LucideIconsList.TextSearch,
        children: [
            {
                label: 'Adresses',
                role: ['ADMIN','SUPER_ADMIN'],
                icon: LucideIconsList.MapPin,
                link: 'addresses'
            },
            {
                label: 'Chantiers',
                role: ['ADMIN','USER','SUPER_ADMIN'],
                icon: LucideIconsList.TrafficCone,
                link: 'construction-sites'
            },
            {
                label: 'Clients',
                role: ['ADMIN','SUPER_ADMIN'],
                icon: LucideIconsList.Sparkles,
                link: 'customers'
            },
            {
                label: 'Commandes',
                role: ['ADMIN','USER','SUPER_ADMIN'],
                icon: LucideIconsList.Package,
                link: 'purchase-orders'
            },
            {
                label: 'Contacts',
                role: ['ADMIN','USER','SUPER_ADMIN'],
                icon: LucideIconsList.BookUser,
                link: 'contacts'
            },
            {
                label: 'Détails de livraison',
                role: ['ADMIN','USER','SUPER_ADMIN'],
                icon: LucideIconsList.PackageSearch,
                link: 'shared-details'
            },
            {
                label: 'Entreprises',
                role: ['ADMIN','USER','SUPER_ADMIN'],
                icon: LucideIconsList.Wallet,
                link: 'companies'
            },
            {
                label: 'Fournisseurs',
                role: ['ADMIN','SUPER_ADMIN'],
                icon: LucideIconsList.Factory,
                link: 'material-suppliers'
            },
            {
                label: 'Livraisons',
                role: ['ADMIN','USER','SUPER_ADMIN'],
                icon: LucideIconsList.PackageCheck,
                link: 'deliveries'
            },
            {
                label: 'Numéros de commande',
                role: ['ADMIN','SUPER_ADMIN'],
                icon: LucideIconsList.Hash,
                link: 'delivery-order-numbers'
            },
            {
                label: 'Pays',
                role: ['ADMIN','SUPER_ADMIN'],
                icon: LucideIconsList.Earth,
                link: 'countries'
            },
            {
                label: 'Produits',
                role: ['ADMIN','SUPER_ADMIN'],
                icon: LucideIconsList.PackageOpen,
                link: 'products'
            },
            {
                label: 'Transporteurs',
                role: ['ADMIN','SUPER_ADMIN'],
                icon: LucideIconsList.Truck,
                link: 'transport-suppliers'
            },
            {
                label: 'Utilisateurs',
                role: ['SUPER_ADMIN'],
                icon: LucideIconsList.Users,
                link: 'users'
            },
            {
                label: 'Villes',
                role: ['ADMIN','SUPER_ADMIN'],
                icon: LucideIconsList.Building2,
                link: 'cities'
            }
        ]
    }
];
