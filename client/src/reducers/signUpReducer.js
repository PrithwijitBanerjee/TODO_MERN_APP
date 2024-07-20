import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../custom_axios/apiUrl';
import { STATUSES } from '../utils/statusObj';
import { toast } from 'react-toastify';


const initialState = {
    redirectReg: null,
    err: null,
    status: STATUSES.IDLE
};

// thunk middleware ...
export const signUpUsr = createAsyncThunk(
    'user/todo/signUp',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/users/signUp', userData);
            return res?.data;
        } catch (error) {
            if (error?.response?.status === 400 && !error?.response.data.success) {
                toast.error(error?.response.data.message, {
                    theme: 'colored'
                });
            }
            return rejectWithValue(error?.response.data.message);
        }
    }
);

// slices ...

const signUpReducer = createSlice({
    name: 'signUp/todos/user',
    initialState,
    reducers: {
        clearReg: state => {
            state.redirectReg = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(signUpUsr.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(signUpUsr.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.redirectReg = "/signIn";
                    toast.success(payload?.message, {
                        theme: 'colored'
                    });
                }
            })
            .addCase(signUpUsr.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.err = payload;
            })
    }
});

export const { clearReg } = signUpReducer.actions;
export default signUpReducer.reducer;