import { createSlice } from "@reduxjs/toolkit";

export interface SuperAdminLoggedInState{
    superAdminLoggedIn: boolean;
    superAdminEmail:string;
}

const initialState : SuperAdminLoggedInState = {
    superAdminLoggedIn: false,
    superAdminEmail:'',
}   

export const superAdminLoggedInStateSlice = createSlice({
    name:'superAdminLoggedIn',
    initialState,
    reducers:{
        superAdminLoggedInToggle: (state,payload) =>{
            state.superAdminLoggedIn = !state.superAdminLoggedIn
            state.superAdminEmail = payload.payload
        },

    }

})

export const {superAdminLoggedInToggle} = superAdminLoggedInStateSlice.actions;

export default superAdminLoggedInStateSlice.reducer;