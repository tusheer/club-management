import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	darkMode: false,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		onDarkModeSelect(state) {
			state.darkMode = true;
		},
	},
});

export const { onDarkModeSelect } = globalSlice.actions;
export default globalSlice.reducer;
