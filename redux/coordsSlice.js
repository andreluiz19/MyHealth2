import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    latitude: null,
    longitude: null,
}

export const coordsSlice = createSlice({
    name: 'coords',
    initialState: initialValues,
    reducers: {
        reducerSetCoords: (state, action) => {
            state.latitude = action.payload.latitude
            state.longitude = action.payload.longitude
        }   
    }
})

export const { reducerSetCoords } = coordsSlice.actions

export default coordsSlice.reducer