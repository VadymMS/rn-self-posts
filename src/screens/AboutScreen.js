import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createHeaderButtonNavigation} from '../navigation/navigationOptions';

export const AboutScreen = ({navigation}) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'О приложении',
            headerLeft: () => createHeaderButtonNavigation(navigation.toggleDrawer),
        });
    }, [navigation]);

    return (
        <View style={styles.center}>
            <Text>Это лучшее приложение для личных заметок.</Text>
            <Text>
                Версия приложения <Text style={styles.version}>1.0.0</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    version: {
        fontFamily: 'open-bold',
    },
});
