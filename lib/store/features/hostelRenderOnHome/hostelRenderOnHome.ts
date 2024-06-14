import { createSlice } from "@reduxjs/toolkit";

export interface hostelRenderOnHome{
    hostelRenderOnHome: [];
}

const initialState : hostelRenderOnHome = {
    hostelRenderOnHome: []
}   

export const hostelRenderOnHomeSlice = createSlice({
    name:'hostelRenderOnHome',
    initialState,
    reducers:{
        hostelRenderOnHome: (state,actions) =>{
            state.hostelRenderOnHome = actions.payload
        },

    }

})

export const {hostelRenderOnHome} = hostelRenderOnHomeSlice.actions;

export default hostelRenderOnHomeSlice.reducer;