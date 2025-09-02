import Header, { HeaderIcon } from '@/components/Header';
import ThemeScroller from '@/components/ThemeScroller';
import React from 'react';
import CustomCard from '@/components/CustomCard';
import { View, Text, Pressable, Image } from 'react-native';
import Icon from '@/components/Icon';
import useShadow from '@/utils/useShadow';
import Section from '@/components/layout/Section';
import { CardScroller } from '@/components/CardScroller';
import Card from '@/components/Card';
import ThemedText from '@/components/ThemedText';
import { Link } from 'expo-router';
import Avatar from '@/components/Avatar';
import ShowRating from '@/components/ShowRating';
import DrawerButton from '@/components/DrawerButton';
import useCollapsibleHeader from '@/app/hooks/useCollapsibleHeader';
import AnimatedView from '@/components/AnimatedView';
import { shadowPresets } from '@/utils/useShadow';

const HomeScreen = () => {
    const { headerVisible, scrollHandler } = useCollapsibleHeader();
    const rightComponents = [
        <HeaderIcon key="notifications-icon" hasBadge icon="Bell" href="/screens/notifications" />
    ];
    const middleComponent = [
        <ThemedText key="app-title" className='text-2xl font-outfit-bold'>
            Rayon
            <Text className="text-green-600">vert</Text>
        </ThemedText>
    ];
    const leftComponent = [
        <DrawerButton key="drawer-button" />
    ];

    return (
        <View className="flex-1 bg-light-primary dark:bg-dark-primary">
            <Header
                
                leftComponent={leftComponent}
                rightComponents={rightComponents}
                middleComponent={middleComponent}
            />

            <ThemeScroller
            >
                <AnimatedView animation="scaleIn" className='flex-1'>
                    <View className="mb-6 px-2">
                        <ThemedText className="text-xl font-semibold mb-2">
                            Bienvenue sur l'application mobile Rayon vert!
                        </ThemedText>
                        <ThemedText className="text-base text-light-subtext dark:text-dark-subtext">
                            Gérez le stock, validez les commandes, suivez la facturation et accédez à des fonctionnalités avancées.
                        </ThemedText>
                    </View>
                    <View>
                        <Section title="Gestion de Stock" titleSize="lg">
                            <CardScroller space={5} className='mt-1'>
                                <CategorySelect bg="bg-teal-600" icon="Box" title="Suivi des Inventaires : Ajouter, modifier et supprimer des articles." />
                                <CategorySelect bg="bg-orange-600" icon="AlertCircle" title="Alertes de Stock : Notifications pour les niveaux de stock bas." />
                                <CategorySelect bg="bg-purple-600" icon="History" title="Historique des Mouvements : Suivi des entrées et sorties de stock." />
                            </CardScroller>
                        </Section>

                        <Section title="Validation" titleSize="lg" className='pt-10'>
                            <CardScroller space={5} className='mt-1 pb-4'>
                                <CategorySelect bg="bg-sky-600" icon="CheckCircle" title="Validation des Commandes : Processus de validation avant expédition." />
                                <CategorySelect bg="bg-lime-600" icon="ShieldCheck" title="Contrôle de Qualité : Vérification des articles avant validation finale." />
                                <CategorySelect bg="bg-pink-600" icon="RotateCcw" title="Gestion des Retours : Processus de retour et validation des articles retournés." />
                            </CardScroller>
                        </Section>

                        <Section title="Facturation" titleSize="lg" className='pt-10'>
                            <CardScroller space={5} className='mt-1 pb-4'>
                                <CategorySelect bg="bg-orange-600" icon="FileText" title="Génération de Factures : Création automatique pour les commandes validées." />
                                <CategorySelect bg="bg-teal-600" icon="CreditCard" title="Suivi des Paiements : Enregistrement des paiements reçus et en attente." />
                                <CategorySelect bg="bg-purple-600" icon="BarChart2" title="Rapports Financiers : Génération de rapports pour le suivi des ventes et paiements." />
                            </CardScroller>
                        </Section>

                        <Section title="Fonctionnalités Additionnelles" titleSize="lg" className='pt-10'>
                            <CardScroller space={5} className='mt-1 pb-4'>
                                <CategorySelect bg="bg-sky-600" icon="UserCheck" title="Authentification des Utilisateurs : Connexion sécurisée." />
                                <CategorySelect bg="bg-pink-600" icon="Bell" title="Notifications Push : Alertes pour les mises à jour importantes." />
                                <CategorySelect bg="bg-lime-600" icon="ShoppingCart" title="Intégration de Paiements : Paiement en ligne pour les clients." />
                            </CardScroller>
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