import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DB} from '../db';
import * as FileSystem from 'expo-file-system';

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadPosts = createAsyncThunk('post/getPosts', async () => {
    const posts = await DB.getPosts();
    return posts;
});

export const toggleBooked = createAsyncThunk('post/toggleBooked', async post => {
    await DB.updatePost(post);
    return post.id;
});

export const removePost = createAsyncThunk('post/removePost', async id => {
    await DB.removePost(id);
    return id;
});

export const addPost = createAsyncThunk('post/addPost', async post => {
    const fileName = post.img.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
        await FileSystem.moveAsync({
            to: newPath,
            from: post.img,
        });
    } catch (error) {
        console.log('Error:', e);
    }

    const payload = {...post, img: newPath};
    const id = await DB.createPost(payload);

    payload.id = id;

    return payload;
});

const initialState = {
    allPosts: [],
    bookedPosts: [],
    loading: true,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        // Standard reducer logic, with auto-generated action types per reducer
        // loadPosts: (state, action) => {
        //     state.allPosts = action.payload;
        //     state.bookedPosts = action.payload.filter(post => post.booked);
        //     state.loading = false;
        // },
        // toggleBooked: (state, action) => {
        //     const allPosts = state.allPosts.map(post => {
        //         if (post.id === action.payload) {
        //             post.booked = !post.booked;
        //         }
        //         return post;
        //     });
        //     state.allPosts = allPosts;
        //     state.bookedPosts = allPosts.filter(post => post.booked);
        // },
        // removePost: (state, action) => {
        //     state.allPosts = state.allPosts.filter(p => p.id !== action.payload);
        //     state.bookedPosts = state.bookedPosts.filter(p => p.id !== action.payload);
        // },
        // addPost: (state, action) => {
        //     state.allPosts = [{...action.payload}, ...state.allPosts];
        // },
    },
    extraReducers: builder => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loadPosts.fulfilled, (state, action) => {
            state.allPosts = action.payload;
            state.bookedPosts = action.payload.filter(post => post.booked);
            state.loading = false;
        });
        builder.addCase(toggleBooked.fulfilled, (state, action) => {
            const allPosts = state.allPosts.map(post => {
                if (post.id === action.payload) {
                    post.booked = !post.booked;
                }
                return post;
            });
            state.allPosts = allPosts;
            state.bookedPosts = allPosts.filter(post => post.booked);
        });
        builder.addCase(removePost.fulfilled, (state, action) => {
            state.allPosts = state.allPosts.filter(p => p.id !== action.payload);
            state.bookedPosts = state.bookedPosts.filter(p => p.id !== action.payload);
        });
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.allPosts = [{...action.payload}, ...state.allPosts];
        });
    },
});

// export const {loadPosts, toggleBooked, removePost, addPost} = postSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBookedPosts = state => state.post.bookedPosts;
export const selectAllPosts = state => state.post.allPosts;
export const selectLoading = state => state.post.loading;

export default postSlice.reducer;
