import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useThemeColors } from '../contexts/ThemeColors';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { DrawerProvider } from '../contexts/DrawerContext';
import Header, { HeaderIcon } from '@/components/Header';
import DrawerButton from '@/components/DrawerButton';
import ThemedText from '@/components/ThemedText';
import { Slot } from 'expo-router';

// Create a ref to the drawer instance that can be used across the app
export const drawerRef = React.createRef();

export default function DrawerLayout() {
    const colors = useThemeColors();
    const [fontsLoaded] = useFonts({
        Outfit_400Regular,
        Outfit_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const rightComponents = [
        <HeaderIcon key="notifications-icon" hasBadge icon="Bell" href="/screens/notifications" />
    ];
    const middleComponent = [
        <ThemedText key="app-title" className='text-2xl font-outfit-bold'>
            Rayon
            <ThemedText className="text-green-600">vert</ThemedText>
        </ThemedText>
    ];
    const leftComponent = [
        <DrawerButton key="drawer-button" />
    ];

    return (
        <DrawerProvider>
            <Drawer
                ref={drawerRef}
                screenOptions={{
                    headerShown: false,
                    drawerType: 'slide',
                    drawerPosition: 'left',
                    drawerStyle: {
                        //backgroundColor: colors.bg,
                        backgroundColor: 'red',
                        width: '85%',
                        flex: 1,
                    },
                    overlayColor: 'rgba(0,0,0, 0.4)',
                    swipeEdgeWidth: 100
                }}
                drawerContent={(props) => <CustomDrawerContent />}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        title: 'Menu',
                        drawerLabel: 'Menu',
                    }}
                //redirect={true}
                />
                <React.Fragment>
                    <Header
                        leftComponent={leftComponent}
                        rightComponents={rightComponents}
                        middleComponent={middleComponent}
                    />
                    <Slot />
                </React.Fragment>
            </Drawer>
        </DrawerProvider>
    );
}