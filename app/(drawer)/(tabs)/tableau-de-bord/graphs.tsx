import React, { useState } from 'react';
import { View, Dimensions, ScrollView, Animated, Easing, useColorScheme } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import ThemedText from '../../../../components/ThemedText';
import Header, { HeaderIcon } from '../../../../components/Header';
import DrawerButton from '../../../../components/DrawerButton';

const screenWidth = Dimensions.get('window').width;

// Mock data pour les graphiques
const lineChartData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      data: [1200, 1500, 1000, 1700, 1300, 1600],
      color: () => '#14b8a6',
      strokeWidth: 2,
    },
  ],
};

const barChartData = {
  labels: ['Service A', 'Service B', 'Service C', 'Service D'],
  datasets: [
    {
      data: [40, 60, 80, 30],
    },
  ],
};

const pieChartData = [
  { name: 'Payé', population: 65, color: '#0ea5e9', legendFontColor: '#333', legendFontSize: 14 },
  { name: 'En attente', population: 25, color: '#f59e42', legendFontColor: '#333', legendFontSize: 14 },
  { name: 'Retard', population: 10, color: '#ec4899', legendFontColor: '#333', legendFontSize: 14 },
];

export default function GraphsScreen() {
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
              Graphiques & Visualisations
            </ThemedText>
          ]}
        />
      </View>
      {/* Sous-titre harmonisé */}
      <View className="pb-4 px-4">
        <ThemedText className="text-base font-medium text-light-subtext dark:text-dark-subtext mb-2">
          Visualisez les tendances et indicateurs clés de votre activité.
        </ThemedText>
      </View>
      {/* Graphiques harmonisés */}
      <View style={{ paddingHorizontal: 16 }}>
        {/* Line Chart */}
        <ThemedText className="text-lg font-semibold mb-2">Tendances de facturation</ThemedText>
        <LineChart
          data={lineChartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(20, 184, 166, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />

        {/* Bar Chart */}
        <ThemedText className="text-lg font-semibold mt-6 mb-2">Répartition des services facturés</ThemedText>
        <BarChart
          data={barChartData}
          width={screenWidth - 32}
          height={220}
          yAxisLabel="" // Ajouté
          yAxisSuffix="" // Ajouté
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />

        {/* Pie Chart */}
        <ThemedText className="text-lg font-semibold mt-6 mb-2">Répartition des paiements</ThemedText>
        <PieChart
          data={pieChartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </Animated.ScrollView>
  );
}