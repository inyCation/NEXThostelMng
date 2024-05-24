import { configureStore } from '@reduxjs/toolkit'
import sideSliderReducer from "./features/sideSlider/sideSlider"
import loggedInReducer from "./features/loggedIn/loggedIn"

export const makeStore = () => {
  return configureStore({
    reducer: {
      sideSlider: sideSliderReducer,
      loggedIn : loggedInReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']