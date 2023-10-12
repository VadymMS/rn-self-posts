import {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {createHeaderButtonNavigation} from '../navigation/navigationOptions';
import {useDispatch, useSelector} from 'react-redux';
import {PostList} from '../components/PostList';
import {THEME} from '../theme';
import {loadPosts, selectAllPosts, selectLoading} from '../store/post';

export const MainScreen = ({navigation}) => {
    useEffect(() => {
        navigation.setOptions({
            title: 'Мой блог',
            headerRight: () =>
                createHeaderButtonNavigation(() => navigation.navigate('PostCreate'), 'Take photo', 'ios-camera'),
            headerLeft: () => createHeaderButtonNavigation(navigation.toggleDrawer),
        });
    }, [navigation]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    const allPosts = useSelector(selectAllPosts);
    const loading = useSelector(selectLoading);

    const openPostHandler = post => {
        navigation.navigate('Post', {postId: post.id, date: post.date});
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR} size="large" />
            </View>
        );
    }

    return <PostList data={allPosts} onOpen={openPostHandler} />;
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
