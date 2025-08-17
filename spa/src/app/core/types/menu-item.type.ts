import {LucideIconData} from 'lucide-angular';

export type MenuItem = {
    label: string;
    role: string[];
    icon?: LucideIconData;
    link?: string;
    children?: MenuItem[];
}
