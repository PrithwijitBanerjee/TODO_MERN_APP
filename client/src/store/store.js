import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../reducers/signUpReducer';
import signInReducer from '../reducers/signInReducer';
import todoReducer from '../reducers/todoReducer';


// global store of redux in this application ...
export const store = configureStore({
    reducer: {
        signUpUsr: signUpReducer,
        signInUsr: signInReducer,
        getTodos: todoReducer,
    }
});