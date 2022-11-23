import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import vacinaSlice from "./vacinaSlice";
import coordsSlice from "./coordsSlice";

export const store = configureStore({
    reducer: {
        login: loginSlice,
        vacina: vacinaSlice,
        coords: coordsSlice
    }
})