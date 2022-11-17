import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    email: null,
    password: null,
    idUser: null,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialValues,
    reducers: {
        reducerSetLogin: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
            state.idUser = action.payload.idUser
        }   
    }
})

export const { reducerSetLogin } = loginSlice.actions

export default loginSlice.reducer