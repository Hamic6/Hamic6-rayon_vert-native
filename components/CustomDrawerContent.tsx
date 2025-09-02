import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Pressable, Image } from 'react-native';
import ThemedText from './ThemedText';
import Icon, { IconName } from './Icon';
import ThemeToggle from '@/components/ThemeToggle';
import ThemedScroller from './ThemeScroller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DashboardItem = {
    href: string;
    icon: IconName;
    label: string;
    children?: DashboardItem[];
};

const dashboardItems: DashboardItem[] = [
    { href: "/", icon: "Home", label: "Accueil" },
    {
        href: "/tableau-de-bord",
        icon: "BarChart2",
        label: "Tableau de Bord",
        children: [
            { href: "/tableau-de-bord/stats", icon: "BarChart2", label: "Statistiques de facturation" },
            { href: "/tableau-de-bord/graphs", icon: "BarChart2", label: "Graphiques et visualisations" },
            { href: "/tableau-de-bord/performance", icon: "BarChart2", label: "Indicateurs de performance" },
            { href: "/tableau-de-bord/alerts", icon: "Bell", label: "Alertes et notifications" },
        ],
    },
    {
        href: "/avis-de-passage",
        icon: "Bell",
        label: "Avis de Passage",
        children: [
            { href: "/avis-de-passage/creer-avis-passage", icon: "FileText", label: "Créer un Avis de Passage" },
            { href: "/avis-de-passage/rechercher-avis-passage", icon: "CheckCircle", label: "Gestion des Avis de Passage" },
        ],
    },
    {
        href: "/stock-management",
        icon: "Archive",
        label: "Gestion de Stock",
        children: [
            { href: "/stock/items", icon: "Archive", label: "Bon de commande" },
            { href: "/stock/add", icon: "Archive", label: "Créer un Article" },
            { href: "/stock/management", icon: "Archive", label: "Inventaire" },
            { href: "/stock/bon-de-commande", icon: "Archive", label: "Gestion des bons de commande" },
            { href: "/stock/delivery-note", icon: "Archive", label: "Créer un bon de livraison" },
            { href: "/stock/delivery-management", icon: "Archive", label: "Gestion des bons de livraison" },
            { href: "/stock/receptions", icon: "Archive", label: "Bons de Réception" },
            {
                href: "/stock/validation",
                icon: "CheckCircle",
                label: "Validation",
                children: [
                    { href: "/stock/validation/management", icon: "CheckCircle", label: "Gestion des validations" },
                ],
            },
        ],
    },
    {
        href: "/roles-permissions",
        icon: "Users",
        label: "Gestion des Utilisateurs",
        children: [
            { href: "/roles-permissions/add-user", icon: "Users", label: "Ajouter un Utilisateur" },
            { href: "/roles-permissions/assign", icon: "Key", label: "Assigner des Rôles" },
        ],
    },
];

export default function CustomDrawerContent() {
    const insets = useSafeAreaInsets();

    return (
        <ThemedScroller className="flex-1 p-8 bg-white dark:bg-dark-primary" style={{ paddingTop: insets.top }}>
            <View style={{ alignItems: 'flex-start', marginBottom: 8, marginTop: 4 }}>
                <Image
                    source={require('@/assets/lrv.png')}
                    style={{ width: 64, height: 64, resizeMode: 'contain' }}
                />
            </View>
            <View className='flex-col pb-4 mb-2 mt-2 border-b border-light-secondary dark:border-dark-secondary'>
                {dashboardItems.map(item => (
                    <NavItem key={item.href} {...item} />
                ))}
            </View>
            <View className='flex-row justify-between items-center'>    
                <ThemedText className='text-sm text-light-subtext dark:text-dark-subtext'>Menu principale</ThemedText>
                <ThemeToggle />
            </View>
        </ThemedScroller>
    );
}

type NavItemProps = DashboardItem & {
    className?: string;
    description?: string;
};

export const NavItem = ({ href, icon, label, children, description }: NavItemProps) => {
    const [open, setOpen] = useState(false);

    const hasChildren = !!children && children.length > 0;

    // Correction : router.push doit utiliser le chemin relatif à app/
    // Vérifie que le href commence bien par "/" et correspond à la structure des fichiers
    return (
        <>
            <Pressable
                onPress={() => hasChildren ? setOpen(!open) : router.push(href)}
                className={`flex-row items-center py-3`}
            >
                <View className='flex-row items-center justify-center w-10 h-10 bg-light-secondary dark:bg-dark-secondary rounded-xl'>
                    <Icon name={icon} size={18} />
                </View>
                <View className='flex-1 ml-4'>
                    {label &&
                        <ThemedText className="text-lg font-bold text-gray-800 dark:text-gray-200">{label}</ThemedText>
                    }
                    {description &&
                        <ThemedText className='opacity-50 text-xs'>{description}</ThemedText>
                    }
                </View>
                {hasChildren && (
                    <Icon name={open ? "ChevronUp" : "ChevronDown"} size={16} />
                )}
            </Pressable>
            {hasChildren && open && (
                <View className="pl-10">
                    {children.map(child => (
                        <NavItem key={child.href} {...child} />
                    ))}
                </View>
            )}
        </>
    );
};


