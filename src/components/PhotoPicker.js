import {View, StyleSheet, Image, Button, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

async function askForPermissions() {
    const {status: cameraStatus} = await ImagePicker.requestCameraPermissionsAsync();
    const {status: cameraRollStatus} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' && cameraRollStatus !== 'granted') {
        Alert.alert('Ошибка', 'Вы не дали прав на создание фото');
        return false;
    }
    return true;
}

export const PhotoPicker = ({onPick, image}) => {
    const takePhoto = async () => {
        const hasPermissions = await askForPermissions();

        if (!hasPermissions) {
            return;
        }

        const {assets} = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9],
        });

        if (!assets) {
            return;
        }

        onPick(assets[0].uri);
    };

    return (
        <View style={styles.wrapper}>
            <Button title="Сделать фото" onPress={takePhoto} />
            {image && <Image style={styles.image} source={{uri: image}} />}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
});
