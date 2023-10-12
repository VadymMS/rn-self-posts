import {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {createHeaderButtonNavigation} from '../navigation/navigationOptions';
import {THEME} from '../theme';
import {PhotoPicker} from '../components/PhotoPicker';
import {addPost} from '../store/post';

export const CreateScreen = ({navigation}) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Создать пост',
            headerLeft: () => createHeaderButtonNavigation(navigation.toggleDrawer),
        });
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setText('');
                setImage(null);
            };
        }, [])
    );

    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: image,
            booked: false,
        };
        dispatch(addPost(post));
        navigation.navigate('Main');
    };

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Создай новый пост</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder="Введите текст заметки"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker onPick={setImage} image={image} />
                    <Button
                        title="Создать пост"
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                        disabled={!text || !image}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10,
    },
    textarea: {
        padding: 10,
        marginBottom: 10,
    },
});
