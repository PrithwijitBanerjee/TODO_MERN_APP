import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUSES } from '../utils/statusObj'
import { axiosInstance } from '../custom_axios/apiUrl';
import { toast } from 'react-toastify';

const initialState = {
    status: STATUSES.IDLE,
    error: null,
    redirectTo: null,
    logoutToggle: false,
    name: ''
};

// thunk middleware ...
export const signInUsr = createAsyncThunk('user/todo/signIn', async (userData, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/users/signIn', userData);
        return res?.data;
    } catch (error) {
        if (error?.response?.status === 401 && !error?.response.data.success) {
            toast.error(error?.response.data.message, {
                theme: 'colored'
            });
        }
        return rejectWithValue(error?.response.data.message);
    }
});

// slices ...
const signInReducer = createSlice({
    name: 'signIn/todo/user',
    initialState,
    reducers: {
        signOut: state => {
            state.logoutToggle = false;
            localStorage.removeItem('access_token');
            localStorage.removeItem('name');
            state.redirectTo = null;
            state.name = '';
        },
        check_token: state => {
            const access_token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
            const name = localStorage.getItem('name') || sessionStorage.getItem('name');
            if (access_token !== null && access_token !== undefined && access_token !== "") {
                state.logoutToggle = true;
                state.name = name;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(signInUsr.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(signInUsr.fulfilled, (state, { payload }) => {
                if (payload.success) {
                    state.status = STATUSES.IDLE;
                    state.name = payload?.name;
                    localStorage.setItem('access_token', payload?.access_token);
                    localStorage.setItem('name', payload?.name);
                    toast.success(payload?.message, {
                        theme: 'colored'
                    });
                    state.redirectTo = "/todo";
                    state.logoutToggle = true;
                }
            })
            .addCase(signInUsr.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
    }
});

export const { signOut, check_token } = signInReducer.actions;
export default signInReducer.reducer;