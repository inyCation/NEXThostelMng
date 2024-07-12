import { configureStore } from '@reduxjs/toolkit'

import superAdminLoggedInReducer from './features/superAdminLoggedIn/superAdminLogin'
import loggedInReducer from "./features/loggedIn/loggedIn"
import adminLoggedInReducer from "./features/adminLoggedIn/adminLogin"
import hostelRenderOnHomeReducer from "./features/hostelRenderOnHome/hostelRenderOnHome"
import featuredHostelReducer from "./features/featuredHostel/featuredHostel"
import hostelRenderForSuperAdminPanelReducer  from './features/hostelRenderForSuperAdminPanel/hostelRenderForSuperAdminPanel'

export const makeStore = () => {
  return configureStore({
    reducer: {
      superAdminLoogedIn : superAdminLoggedInReducer,
      loggedIn : loggedInReducer,
      adminLoggedIn : adminLoggedInReducer,
      hostelRenderOnHome : hostelRenderOnHomeReducer,
      featuredHostel : featuredHostelReducer,
      hostelRenderForSuperAdminPanel : hostelRenderForSuperAdminPanelReducer,
    }
  })
}


export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']