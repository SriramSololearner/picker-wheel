import { configureStore } from '@reduxjs/toolkit'
import Slider from './reducers/Slider';

export const Store = configureStore({
    reducer: {
        spinner: Slider
    }
});


export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
