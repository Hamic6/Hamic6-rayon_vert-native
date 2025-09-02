import Header, { HeaderIcon } from '@/components/Header';
import ThemeScroller from '@/components/ThemeScroller';
import React from 'react';
import CustomCard from '@/components/CustomCard';
import { View, Text, Pressable, Image } from 'react-native';
import Icon from '@/components/Icon';
import useShadow from '@/utils/useShadow';
import Section from '@/components/layout/Section';
import ThemedText from '@/components/ThemedText';
import { Link } from 'expo-router';
import Avatar from '@/components/Avatar';
import ShowRating from '@/components/ShowRating';
import DrawerButton from '@/components/DrawerButton';
import useCollapsibleHeader from '@/app/hooks/useCollapsibleHeader';
import AnimatedView from '@/components/AnimatedView';
import { shadowPresets } from '@/utils/useShadow';

const HomeScreen = () => {
    // Mock data pour le nom d'utilisateur
    const [userName] = React.useState("Danny Hamici"); // Remplace par le nom que tu veux
    const { headerVisible, scrollHandler } = useCollapsibleHeader();
    const rightComponents = [
        <HeaderIcon key="notifications-icon" hasBadge icon="Bell" href="/screens/notifications" />
    ];
    const middleComponent = [
        <Image
            key="logo"
            source={require('@/assets/lrv.png')}
            style={{ width: 96, height: 96, resizeMode: 'contain' }}
        />
    ];
    const leftComponent = [
        <DrawerButton key="drawer-button" />
    ];

    // Section titles with icons
    const sectionTitles = {
        "Gestion de Stock": (
            <View className="flex-row items-center">
                <Icon name="Box" size={20} color="#0891b2" className="mr-2" />
                <ThemedText className="text-lg font-bold">Gestion de Stock</ThemedText>
            </View>
        ),
        "Validation": (
            <View className="flex-row items-center">
                <Icon name="CheckCircle" size={20} color="#0ea5e9" className="mr-2" />
                <ThemedText className="text-lg font-bold">Validation</ThemedText>
            </View>
        ),
        "Facturation": (
            <View className="flex-row items-center">
                <Icon name="FileText" size={20} color="#f59e42" className="mr-2" />
                <ThemedText className="text-lg font-bold">Facturation</ThemedText>
            </View>
        ),
        "Fonctionnalités Additionnelles": (
            <View className="flex-row items-center">
                <Icon name="UserCheck" size={20} color="#ec4899" className="mr-2" />
                <ThemedText className="text-lg font-bold">Fonctionnalités Additionnelles</ThemedText>
            </View>
        ),
    };

    return (
        <View className="flex-1 bg-light-primary dark:bg-dark-primary">
            <Header
                leftComponent={leftComponent}
                rightComponents={rightComponents}
                middleComponent={middleComponent}
            />

            <ThemeScroller>
                <AnimatedView animation="scaleIn" className='flex-1'>
                    <View className="mb-6 px-2">
                        <ThemedText className="text-xl font-semibold mb-2 text-center">
                            Bienvenue {userName} !
                        </ThemedText>
                    </View>
                    <View>
                        <Section title={sectionTitles["Gestion de Stock"]} titleSize="lg">
                            <View className="w-full flex-col p-6 rounded-2xl bg-teal-600 shadow-lg mb-4">
                                <View className="flex-row items-center mb-4">
                                    <Icon name="Box" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Suivi des Inventaires : Ajouter, modifier et supprimer des articles.
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center mb-4">
                                    <Icon name="AlertCircle" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Alertes de Stock : Notifications pour les niveaux de stock bas.
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon name="History" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Historique des Mouvements : Suivi des entrées et sorties de stock.
                                    </ThemedText>
                                </View>
                            </View>
                        </Section>

                        <Section title={sectionTitles["Validation"]} titleSize="lg" className='pt-10'>
                            <View className="w-full flex-col p-6 rounded-2xl bg-sky-600 shadow-lg mb-4">
                                <View className="flex-row items-center mb-4">
                                    <Icon name="CheckCircle" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Validation des Commandes : Processus de validation avant expédition.
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center mb-4">
                                    <Icon name="ShieldCheck" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Contrôle de Qualité : Vérification des articles avant validation finale.
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon name="RotateCcw" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Gestion des Retours : Processus de retour et validation des articles retournés.
                                    </ThemedText>
                                </View>
                            </View>
                        </Section>

                        <Section title={sectionTitles["Facturation"]} titleSize="lg" className='pt-10'>
                            <View className="w-full flex-col p-6 rounded-2xl bg-orange-600 shadow-lg mb-4">
                                <View className="flex-row items-center mb-4">
                                    <Icon name="FileText" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Génération de Factures : Création automatique pour les commandes validées.
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center mb-4">
                                    <Icon name="CreditCard" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Suivi des Paiements : Enregistrement des paiements reçus et en attente.
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon name="BarChart2" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Rapports Financiers : Génération de rapports pour le suivi des ventes et paiements.
                                    </ThemedText>
                                </View>
                            </View>
                        </Section>

                        <Section title={sectionTitles["Fonctionnalités Additionnelles"]} titleSize="lg" className='pt-10'>
                            <View className="w-full flex-col p-6 rounded-2xl bg-pink-600 shadow-lg mb-4">
                                <View className="flex-row items-center mb-4">
                                    <Icon name="UserCheck" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Authentification des Utilisateurs : Connexion sécurisée.
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center mb-4">
                                    <Icon name="Bell" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Notifications Push : Alertes pour les mises à jour importantes.
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon name="ShoppingCart" size={28} color="#fff" className="mr-3" />
                                    <ThemedText
                                        className="text-xs font-medium text-white flex-1"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        Intégration de Paiements : Paiement en ligne pour les clients.
                                    </ThemedText>
                                </View>
                            </View>
                        </Section>
                    </View>
                </AnimatedView>
            </ThemeScroller>
        </View>
    );
}

export const SearchPressable = () => {
    return (
        <Link href="/screens/search-form" asChild>
            <Pressable
                style={{ ...shadowPresets.card }}
                className='bg-light-primary py-3 px-10   dark:bg-white/20 rounded-full relative flex-1'>
                <Icon name="Search" className="absolute top-2.5 left-3 z-50" size={20} />
                <ThemedText className='text-black dark:text-white'>Search here</ThemedText>
            </Pressable>
        </Link>
    )
}

const CategorySelect = (props: any) => {
    return (
        <Link href="/screens/products" asChild>
            <Pressable className={`flex-col flex items-between py-4 pl-4 justify-between w-28  rounded-xl ${props.bg}`}>
                <View className='flex items-start justify-start mb-6'>
                    <Icon name={props.icon} strokeWidth={1.2} size={24} color="white" />
                </View>
                <Text className="text-xs w-full text-left font-semibold text-white mt-1">{props.title}</Text>
            </Pressable>
        </Link>
    )
}

const PopularUsers = (props: any) => {
    return (
        <Link href="/screens/user-profile" asChild>
            <Pressable
            style={{
                ...shadowPresets.card
            }}
            className="w-80 rounded-xl  bg-neutral-100 dark:bg-dark-secondary">
                <Image source={props.image} className="w-full h-36 rounded-xl" />
                <View className='p-4 pt-0 items-start -mt-10'>
                    <View className='rounded-full border-4 border-light-secondary dark:border-dark-secondary'>
                        <Avatar src={props.avatar} size="lg" />
                    </View>
                    <View className='w-full flex-row items-center justify-between'>
                        <ThemedText className='text-base font-semibold mt-2'>{props.name}</ThemedText>
                        <ShowRating rating={props.rating} />
                    </View>
                    <View className='w-full flex-row items-center justify-start opacity-50'>
                        <Icon name="MapPin" size={12} />
                        <ThemedText className='text-xs ml-1'>{props.location}</ThemedText>
                    </View>
                    <ThemedText className='text-sm text-light-subtext dark:text-dark-subtext mt-3'>{props.descfiption}</ThemedText>
                </View>
            </Pressable>
        </Link>
    )
}

const EventCard = (props: any) => {
    return (
        <Pressable 
        style={{
            ...shadowPresets.card
        }}
        className="w-full flex flex-row mb-2 items-center p-2 rounded-xl  bg-light-secondary dark:bg-dark-secondary">
            <Image source={props.image} className=" w-16 h-16 rounded-xl" />
            <View className='ml-4'>
                <ThemedText className='text-sm font-semibold  '>{props.title}</ThemedText>
                <View className='flex-row items-center opacity-50'>
                    <Icon name="MapPin" size={12} />
                    <ThemedText className='text-xs ml-1'>{props.location}</ThemedText>
                </View>
            </View>
        </Pressable>
    )
}

export default HomeScreen;