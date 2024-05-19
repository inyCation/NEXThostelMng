import { createSlice } from "@reduxjs/toolkit";

export interface sideSliderState{
    opened: boolean;
}

const initialState : sideSliderState = {
    opened:false
}

export const sideSliderStateSlice = createSlice({
    name:'sideSlider',
    initialState,

    reducers:{
        toggleSideSlider: (state) =>{
            state.opened = !state.opened
        },

    }

})

export const {toggleSideSlider} = sideSliderStateSlice.actions;

export default sideSliderStateSlice.reducer;