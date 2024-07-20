import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { axiosInstance } from '../custom_axios/apiUrl';
import { toast } from 'react-toastify';

const initialState = {
    status: STATUSES.LOADING,
    todos: [],
    error: null,
    todo: null
};

// thunk middleware for getting todo list ...
export const getTodos = createAsyncThunk('users/todo/list', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/todos/list');
        return res.data;
    } catch (error) {
        if (error?.response?.status === 400 && !error?.response.data.success) {
            toast.error(error?.response.data.message, {
                theme: 'colored'
            });
        }
        return rejectWithValue(error?.response.data.message);
    }
});

export const addNewTodo = createAsyncThunk('users/todo/add', async todo => {
    try {
        const res = await axiosInstance.post('/todos/add', todo);
        if (res.data.success) {
            toast.success(res?.data?.message, {
                theme: 'colored'
            });
        }
        return res.status;
    } catch (error) {
        console.log("error: ", error);
        if (error?.response?.status === 401 && !error?.response.data.success) {
            toast.error(error?.response.data.message, {
                theme: 'colored'
            });
        }
        return error?.response?.status;
    }
});

export const getSingleTodo = createAsyncThunk('user/todo/single', async (usrId, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`/todos/list/${usrId}`);
        return res.data;
    } catch (error) {
        if (error?.response?.status === 400 && !error?.response.data.success) {
            toast.error(error?.response.data.message, {
                theme: 'colored'
            });
        }
        return rejectWithValue(error?.response.data.message);
    }
});

export const delTodo = createAsyncThunk('user/todo/del', async usrId => {
    try {
        const res = await axiosInstance.delete(`/todos/del/${usrId}`);
        if (res.data.success) {
            toast.success(res?.data?.message, {
                theme: 'colored'
            });
            return usrId; // Return the deleted todo ID
        }
    } catch (error) {
        console.log("error: ", error);
        if (error?.response?.status === 401 && !error?.response.data.success) {
            toast.error(error?.response.data.message, {
                theme: 'colored'
            });
        }
        throw new Error(error?.response?.status);
    }
});

export const editTodoById = createAsyncThunk('user/todo/edit', async ({ usrId, userData }) => {
    try {
        const res = await axiosInstance.put(`/todos/edit/${usrId}`, userData);
        if (res.data.success) {
            toast.success(res?.data?.message, {
                theme: 'colored'
            });
        }
        return res.status;
    } catch (error) {
        console.log("error: ", error);
        if (!error?.response.data.success) {
            toast.error(error?.response.data.message, {
                theme: 'colored'
            });
        }
        return error?.response?.status;
    }
});

// thunk middlewares ...
const todoReducer = createSlice({
    name: 'list/todo/users',
    initialState,
    extraReducers: builder => {
        builder.addCase(getTodos.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(getTodos.fulfilled, (state, { payload }) => {
                if (payload.success) {
                    state.status = STATUSES.IDLE;
                    state.todos = payload?.todos;
                }
            })
            .addCase(getTodos.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(getSingleTodo.pending, state => {
                state.status = STATUSES.LOADING;
                state.error = null;
            })
            .addCase(getSingleTodo.fulfilled, (state, { payload }) => {
                if (payload.success) {
                    state.status = STATUSES.IDLE;
                    state.todo = payload.todo;
                }
            })
            .addCase(getSingleTodo.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(delTodo.fulfilled, (state, { payload }) => {
                state.todos = state.todos.filter(todo => todo.id !== payload);
            })
            .addCase(delTodo.rejected, (state, { error }) => {
                state.error = error.message;
            });
    }
});

export default todoReducer.reducer;