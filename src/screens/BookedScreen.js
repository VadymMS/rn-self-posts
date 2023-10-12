import {useEffect} from 'react';
import {createHeaderButtonNavigation} from '../navigation/navigationOptions';
import {useSelector} from 'react-redux';
import {PostList} from '../components/PostList';
import {selectBookedPosts} from '../store/post';

export const BookedScreen = ({navigation}) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Избранное',
            headerLeft: () => createHeaderButtonNavigation(navigation.toggleDrawer),
        });
    }, [navigation]);

    const bookedPosts = useSelector(selectBookedPosts);

    const openPostHandler = post =>
        navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
        });

    return <PostList data={bookedPosts} onOpen={openPostHandler} />;
};
