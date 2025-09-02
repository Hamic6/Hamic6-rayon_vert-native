import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, Easing, useColorScheme } from 'react-native';
import ThemedText from '../../../../components/ThemedText';
import Icon, { IconName } from '../../../../components/Icon';
import Header, { HeaderIcon } from '../../../../components/Header';
import DrawerButton from '../../../../components/DrawerButton';

const mockStats: { title: string; value: string | number; icon: IconName; colorLight: string; colorDark: string; status?: 'ok' | 'pending' | 'alert' }[] = [
    { title: 'Total des factures émises', value: 128, icon: 'FileText', colorLight: 'bg-teal-600', colorDark: 'bg-teal-800', status: 'ok' },
    { title: 'Montant total facturé (TTC)', value: '52 300 €', icon: 'CreditCard', colorLight: 'bg-orange-500', colorDark: 'bg-orange-700', status: 'ok' },
    { title: 'Factures payées', value: 110, icon: 'CheckCircle', colorLight: 'bg-lime-600', colorDark: 'bg-lime-800', status: 'ok' },
    { title: 'Factures en attente', value: 18, icon: 'AlertCircle', colorLight: 'bg-pink-500', colorDark: 'bg-pink-700', status: 'pending' },
    { title: 'Montant total des paiements reçus (TTC)', value: '48 900 €', icon: 'BarChart2', colorLight: 'bg-purple-500', colorDark: 'bg-purple-700', status: 'ok' },
];

const periods = ['Ce mois-ci', 'Ce trimestre', 'Cette année'];
const statusColors = {
    ok: 'bg-green-500 dark:bg-green-700',
    pending: 'bg-yellow-500 dark:bg-yellow-700',
    alert: 'bg-red-500 dark:bg-red-700',
};

export default function StatsScreen() {
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
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
                        <HeaderIcon key="notifications-icon" hasBadge icon="Bell" href="/screens/notifications" />
                    ]}
                    middleComponent={[
                        <ThemedText
                            key="title"
                            className="text-xl font-bold text-dark-primary dark:text-white"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            Statistiques
                        </ThemedText>
                    ]}
                />
            </View>
            {/* Sous-titre harmonisé */}
            <View className="pb-4 px-4">
                <ThemedText className="text-base font-medium text-light-subtext dark:text-dark-subtext mb-2">
                    Indicateurs clés de la facturation et des paiements.
                </ThemedText>
                <View className="flex-row space-x-2 mt-2">
                    {periods.map(period => (
                        <TouchableOpacity
                            key={period}
                            onPress={() => setSelectedPeriod(period)}
                            className={`px-3 py-1 rounded-full ${selectedPeriod === period ? 'bg-green-600' : 'bg-light-secondary dark:bg-dark-secondary'}`}
                        >
                            <ThemedText className={`text-xs font-bold ${selectedPeriod === period ? 'text-white' : 'text-dark-primary dark:text-white'}`}>
                                {period}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {/* Cards harmonisées */}
            <View className="flex-col space-y-6 px-4">
                {mockStats.map((stat, idx) => (
                    <TouchableOpacity
                        activeOpacity={0.85}
                        key={idx}
                        className={`flex-row items-center p-5 rounded-2xl shadow-lg ${colorScheme === 'dark' ? stat.colorDark : stat.colorLight}`}
                        style={{
                            minHeight: 100,
                            alignItems: 'center',
                        }}
                    >
                        <View className="mr-6">
                            <Icon name={stat.icon} size={36} color="#fff" />
                        </View>
                        <View className="flex-1">
                            <ThemedText className="text-lg font-semibold text-white mb-1">
                                {stat.title}
                            </ThemedText>
                            <ThemedText className="text-xl font-bold text-white">
                                {stat.value}
                            </ThemedText>
                        </View>
                        <View className={`ml-2 w-8 h-8 rounded-full items-center justify-center ${statusColors[stat.status ?? 'ok']}`}>
                            {stat.status === 'ok' && <Icon name="CheckCircle" size={20} color="#fff" />}
                            {stat.status === 'pending' && <Icon name="AlertCircle" size={20} color="#fff" />}
                            {stat.status === 'alert' && <Icon name="XCircle" size={20} color="#fff" />}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Résumé harmonisé */}
            <View className="mt-10 px-4">
                <View className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-5 items-center">
                    <ThemedText className="text-base font-bold text-dark-primary dark:text-white">
                        85% des factures sont payées {selectedPeriod.toLowerCase()}.
                    </ThemedText>
                </View>
            </View>
        </Animated.ScrollView>
    );
}