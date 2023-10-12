import 'react-native-gesture-handler';
import {useEffect} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {bootstrap} from './src/bootstrap';
import {AppNavigation} from './src/navigation/AppNavigation';
import {Provider} from 'react-redux';
import store from './src/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        'open-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            await bootstrap();
            await SplashScreen.hideAsync();
        }
        fontsLoaded && prepare();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
}
