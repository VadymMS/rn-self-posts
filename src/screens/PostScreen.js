import {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createHeaderButtonNavigation} from '../navigation/navigationOptions';
import {THEME} from '../theme';
import {removePost, toggleBooked} from '../store/post';

export const PostScreen = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {postId, date} = route.params;
    const post = useSelector(state => state.post.allPosts.find(p => p.id === postId));
    const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId));
    const iconName = booked ? 'ios-star' : 'ios-star-outline';

    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(post));
    }, [dispatch, post]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: post ? 'Пост от ' + new Date(date).toLocaleDateString() : 'Вернуться назад',
            headerRight: () => (post ? createHeaderButtonNavigation(toggleHandler, 'Take photo', iconName) : null),
        });
    }, [navigation, date, iconName, toggleHandler]);

    const removeHandler = () => {
        Alert.alert(
            'Удаление поста',
            'Вы точно хотите удалить пост?',
            [
                {
                    text: 'Отменить',
                    style: 'cancel',
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress() {
                        navigation.goBack();
                        dispatch(removePost(postId));
                    },
                },
            ],
            {cancelable: false}
        );
    };

    if (!post) {
        return (
            <View style={styles.center}>
                <Text style={styles.noPostTitle}>Пост был удален!</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <Image source={{uri: post.img}} style={styles.image} />
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button title="Удалить" color={THEME.DANGER_COLOR} onPress={removeHandler} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    textWrap: {
        padding: 10,
    },
    title: {
        fontFamily: 'open-regular',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPostTitle: {
        fontFamily: 'open-bold',
        color: '#a71111',
        fontSize: 24,
    },
});
