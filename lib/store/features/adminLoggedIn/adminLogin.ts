import { createSlice } from "@reduxjs/toolkit";

export interface adminLoggedInState{
    adminLoggedIn: boolean;
    adminEmail:string;
}

const initialState : adminLoggedInState = {
    adminLoggedIn: true,
    adminEmail:'hir@gmail.com',
}   

export const adminLoggedInStateSlice = createSlice({
    name:'adminLoggedIn',
    initialState,
    reducers:{
        adminLoggedInToggle: (state,payload) =>{
            state.adminLoggedIn = !state.adminLoggedIn
            state.adminEmail = payload.payload
        },

    }

})

export const {adminLoggedInToggle} = adminLoggedInStateSlice.actions;

export default adminLoggedInStateSlice.reducer;