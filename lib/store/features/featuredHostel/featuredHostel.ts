import { createSlice } from "@reduxjs/toolkit";

export interface featuredHostel{
    featuredHostel:[],
}

const initialState : featuredHostel = {
    featuredHostel:[]
}

export const featuredHostelSlice = createSlice({
    name:'featuredHostel',
    initialState,
    reducers:{
        featuredHostel:(state,actions) =>{
            state.featuredHostel = actions.payload
        }
    }
})


export const {featuredHostel} = featuredHostelSlice.actions;

export default featuredHostelSlice.reducer;