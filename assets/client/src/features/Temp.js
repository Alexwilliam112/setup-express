import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { url } from "../../router/router";

const initialState = {
    temp: [],
    loading: false,
    error: ""
};

export const renamethisSlice = createSlice({

    name: "temp",

    initialState,

    reducers: {

        fetchPending(state) {
            state.loading = true;
            state.temp = []
            state.error = ""
        },
        fetchSuccess(state, action) {
            state.loading = false
            state.temp = action.payload
            state.error = ""
        },
        fetchReject(state, action) {
            state.loading = false
            state.temp = []
            state.error = action.payload
        },
    }
})

export const { fetchPending, fetchSuccess, fetchReject } = renamethisSlice.actions;

export const fetchAlltemp = () => async (dispatch) => {
    try {
        dispatch(fetchPending())

        const { data } = await axios.get(`${url}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        });

        dispatch(fetchSuccess(data.data))

    } catch (error) {
        dispatch(fetchReject(error.message))
    }
}

export default renamethisSlice.reducer;
