import React, { useState } from 'react';
import { View, Animated, Easing, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import ThemedText from '../../../../components/ThemedText';
import Icon, { IconName } from '../../../../components/Icon';
import Header, { HeaderIcon } from '../../../../components/Header';
import DrawerButton from '../../../../components/DrawerButton';

const mockIndicators: { title: string; value: string; icon: IconName; colorLight: string; colorDark: string }[] = [
    { title: 'Taux de recouvrement', value: '92.5 %', icon: 'TrendingUp', colorLight: 'bg-teal-600', colorDark: 'bg-teal-800' },
    { title: 'Délais de paiement moyen', value: '14 jours', icon: 'Clock', colorLight: 'bg-orange-500', colorDark: 'bg-orange-700' },
    { title: 'Montant moyen par facture', value: '1 250 USD', icon: 'DollarSign', colorLight: 'bg-purple-500', colorDark: 'bg-purple-700' },
];

export default function PerformanceScreen() {
    const [fadeAnim] = useState(new Animated.Value(0));
    const colorScheme = useColorScheme();

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.ScrollView
            style={{ opacity: fadeAnim }}
            contentContainerStyle={{ paddingBottom: 32 }}
            className="bg-light-primary dark:bg-dark-primary"
        >
            {/* Header harmonisé */}
            <View className="px-4 pt-4 pb-2">
                <Header
                    leftComponent={[<DrawerButton key="drawer" />]}
                    rightComponents={[
                        <HeaderIcon
                            key="notifications-icon"
                            hasBadge
                            icon="Bell"
                            href="/screens/notifications"
                        />,
                    ]}
                    middleComponent={[
                        <ThemedText
                            key="title"
                            className="text-xl font-bold text-dark-primary dark:text-white"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            Indicateurs de performance
                        </ThemedText>
                    ]}
                />
            </View>
            {/* Sous-titre harmonisé */}
            <View className="pb-4 px-4">
                <ThemedText className="text-base font-medium text-light-subtext dark:text-dark-subtext mb-2">
                    Suivez vos KPIs clés pour piloter votre activité.
                </ThemedText>
            </View>
            {/* Cards harmonisées */}
            <View className="flex-col space-y-6 px-4">
                {mockIndicators.map((indicator, idx) => (
                    <TouchableOpacity
                        activeOpacity={0.85}
                        key={idx}
                        className={`flex-row items-center p-5 rounded-2xl shadow-lg ${colorScheme === 'dark' ? indicator.colorDark : indicator.colorLight}`}
                        style={{
                            minHeight: 100,
                            alignItems: 'center',
                        }}
                    >
                        <View className="mr-6">
                            <Icon name={indicator.icon} size={36} color="#fff" />
                        </View>
                        <View className="flex-1">
                            <ThemedText className="text-lg font-semibold text-white mb-1">
                                {indicator.title}
                            </ThemedText>
                            <ThemedText className="text-xl font-bold text-white">
                                {indicator.value}
                            </ThemedText>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Résumé harmonisé */}
            <View className="mt-10 px-4">
                <View className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-5 items-center">
                    <ThemedText className="text-base font-bold text-dark-primary dark:text-white">
                        Ces indicateurs sont calculés sur la période en cours.
                    </ThemedText>
                </View>
            </View>
        </Animated.ScrollView>
    );
}