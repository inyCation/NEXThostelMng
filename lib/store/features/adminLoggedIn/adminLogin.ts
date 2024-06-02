import { createSlice } from "@reduxjs/toolkit";

export interface adminLoggedInState{
    adminLoggedIn: boolean;
}

const initialState : adminLoggedInState = {
    adminLoggedIn: false
}   

export const adminLoggedInStateSlice = createSlice({
    name:'adminLoggedIn',
    initialState,
    reducers:{
        adminLoggedInToggle: (state) =>{
            state.adminLoggedIn = !state.adminLoggedIn
        },

    }

})

export const {adminLoggedInToggle} = adminLoggedInStateSlice.actions;

export default adminLoggedInStateSlice.reducer;