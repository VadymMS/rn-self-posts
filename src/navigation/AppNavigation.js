import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Platform} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import {MainScreen} from '../screens/MainScreen';
import {PostScreen} from '../screens/PostScreen';
import {BookedScreen} from '../screens/BookedScreen';
import {AboutScreen} from '../screens/AboutScreen';
import {CreateScreen} from '../screens/CreateScreen';
import {THEME} from '../theme';

const isAndroid = Platform.OS === 'android';

const Stack = createNativeStackNavigator();
const Tab = isAndroid ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const stackNavigatorOptions = {
    headerStyle: {backgroundColor: isAndroid ? THEME.MAIN_COLOR : '#fff'},
    headerTintColor: isAndroid ? '#fff' : THEME.MAIN_COLOR,
};

const tabNavigatorOptionsAndroid = {
    inactiveColor: '#ffffff70',
    activeColor: '#fff',
    shifting: true,
    barStyle: {backgroundColor: THEME.MAIN_COLOR},
};
const tabNavigatorOptionsIOS = {screenOptions: {tabBarActiveTintColor: THEME.MAIN_COLOR}};
const tabNavigatorOptions = isAndroid ? tabNavigatorOptionsAndroid : tabNavigatorOptionsIOS;

const PostNavigator = () => (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
);

const BookedNavigator = () => (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
        <Stack.Screen name="Booked" component={BookedScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
);

const AboutNavigator = () => (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
        <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
);

const CreateNavigator = () => (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
        <Stack.Screen name="Create" component={CreateScreen} />
    </Stack.Navigator>
);

const BottomNavigator = () => {
    const theme = useTheme();
    theme.colors.secondaryContainer = 'transperent';
    return (
        <Tab.Navigator {...tabNavigatorOptions}>
            <Tab.Screen
                name="AllPosts"
                component={PostNavigator}
                options={{
                    tabBarLabel: 'Все',
                    tabBarIcon: ({color}) => <Ionicons name="ios-albums" size={25} color={color} />,
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Tab.Screen
                name="BookedPosts"
                component={BookedNavigator}
                options={{
                    tabBarLabel: 'Избранное',
                    tabBarIcon: ({color}) => <Ionicons name="ios-star" size={25} color={color} />,
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
        </Tab.Navigator>
    );
};

const MainNavigator = () => (
    <Drawer.Navigator
        screenOptions={{drawerActiveTintColor: THEME.MAIN_COLOR, drawerLabelStyle: {fontFamily: 'open-bold'}}}
    >
        <Drawer.Screen
            name="PostTabs"
            component={BottomNavigator}
            options={{drawerLabel: 'Главная', headerShown: false}}
        />
        <Drawer.Screen
            name="PostAbout"
            component={AboutNavigator}
            options={{drawerLabel: 'О приложении', headerShown: false}}
        />
        <Drawer.Screen
            name="PostCreate"
            component={CreateNavigator}
            options={{drawerLabel: 'Новый пост', headerShown: false}}
        />
    </Drawer.Navigator>
);

export const AppNavigation = () => (
    <NavigationContainer>
        <MainNavigator />
    </NavigationContainer>
);
