import { createSlice } from "@reduxjs/toolkit";

export interface hostelRenderForSuperAdminPanel{
    hostelRenderForSuperAdminPanel: any;
}

const initialState : hostelRenderForSuperAdminPanel = {
    hostelRenderForSuperAdminPanel: []
}   

export const hostelRenderForSuperAdminPanelSlice = createSlice({
    name:'hostelRenderForSuperAdminPanel',
    initialState,
    reducers:{
        hostelRenderForSuperAdminPanel: (state,actions) =>{
            state.hostelRenderForSuperAdminPanel = actions.payload
        },

    }

})

export const {hostelRenderForSuperAdminPanel} = hostelRenderForSuperAdminPanelSlice.actions;

export default hostelRenderForSuperAdminPanelSlice.reducer;