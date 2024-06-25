import { createSlice } from "@reduxjs/toolkit";

export interface loggedInState{
    loggedIn: boolean;
    userEmail:string;
}

const initialState : loggedInState = {
    loggedIn: false,
    userEmail:'',
}   

export const loggedInStateSlice = createSlice({
    name:'loggedIn',
    initialState,
    reducers:{
        loggedInToggle: (state,payload) =>{
            state.loggedIn = !state.loggedIn
            state.userEmail = payload.payload
        },

    }

})

export const {loggedInToggle} = loggedInStateSlice.actions;

export default loggedInStateSlice.reducer;