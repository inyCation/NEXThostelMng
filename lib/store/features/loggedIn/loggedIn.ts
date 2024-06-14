import { createSlice } from "@reduxjs/toolkit";

export interface loggedInState{
    loggedIn: boolean;
}

const initialState : loggedInState = {
    loggedIn: false,
}   

export const loggedInStateSlice = createSlice({
    name:'loggedIn',
    initialState,
    reducers:{
        loggedInToggle: (state) =>{
            state.loggedIn = !state.loggedIn
        },

    }

})

export const {loggedInToggle} = loggedInStateSlice.actions;

export default loggedInStateSlice.reducer;