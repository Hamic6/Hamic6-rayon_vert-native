import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemedText from '../../../../components/ThemedText';
import Icon, { IconName } from '../../../../components/Icon';

const mockStats: { title: string; value: string | number; icon: IconName; color: string; status?: 'ok' | 'pending' | 'alert' }[] = [
    { title: 'Total des factures émises', value: 128, icon: 'FileText', color: 'bg-teal-600', status: 'ok' },
    { title: 'Montant total facturé (TTC)', value: '52 300 €', icon: 'CreditCard', color: 'bg-orange-600', status: 'ok' },
    { title: 'Factures payées', value: 110, icon: 'CheckCircle', color: 'bg-lime-600', status: 'ok' },
    { title: 'Factures en attente', value: 18, icon: 'AlertCircle', color: 'bg-pink-600', status: 'pending' },
    { title: 'Montant total des paiements reçus (TTC)', value: '48 900 €', icon: 'BarChart2', color: 'bg-purple-600', status: 'ok' },
];

const periods = ['Ce mois-ci', 'Ce trimestre', 'Cette année'];
const statusColors = {
    ok: 'bg-green-500',
    pending: 'bg-yellow-500',
    alert: 'bg-red-500',
};

export default function StatsScreen() {
    const insets = useSafeAreaInsets();
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: insets.top,
            }}
            className="bg-light-primary dark:bg-dark-primary"
        >
            <Animated.ScrollView style={{ opacity: fadeAnim }} contentContainerStyle={{ paddingBottom: 32 }}>
                <View className="pb-4 px-4">
                    <ThemedText className="text-3xl font-extrabold mb-2 text-dark-primary dark:text-white">
                        Statistiques de facturation
                    </ThemedText>
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
                <View className="flex-col space-y-4 px-2">
                    {mockStats.map((stat, idx) => (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            key={idx}
                            className={`flex-row items-center p-4 rounded-xl ${stat.color} shadow`}
                        >
                            <View className="mr-4">
                                <Icon name={stat.icon} size={32} color="#fff" />
                            </View>
                            <View className="flex-1">
                                <ThemedText className="text-lg font-semibold text-white">
                                    {stat.title}
                                </ThemedText>
                                <ThemedText className="text-2xl font-bold text-white">
                                    {stat.value}
                                </ThemedText>
                            </View>
                            <View className={`ml-2 w-6 h-6 rounded-full items-center justify-center ${statusColors[stat.status ?? 'ok']}`}>
                                {stat.status === 'ok' && <Icon name="CheckCircle" size={18} color="#fff" />}
                                {stat.status === 'pending' && <Icon name="AlertCircle" size={18} color="#fff" />}
                                {stat.status === 'alert' && <Icon name="XCircle" size={18} color="#fff" />}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="mt-8 px-4">
                    <View className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-4 items-center">
                        <ThemedText className="text-base font-bold text-dark-primary dark:text-white">
                            85% des factures sont payées {selectedPeriod.toLowerCase()}.
                        </ThemedText>
                    </View>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
}