import {configureStore} from '@reduxjs/toolkit';
import postReducer from './post';

export default configureStore({
    reducer: {
        post: postReducer,
    },
});
