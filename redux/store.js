import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import vacinaSlice from "./vacinaSlice";

export const store = configureStore({
    reducer: {
        login: loginSlice,
        vacina: vacinaSlice,
    }
})