import { createSlice } from "@reduxjs/toolkit";


interface SelectedAllState {
  selectedAll: boolean
};

const initialState: SelectedAllState = {
  selectedAll: false
};

const selectedAllSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectedAllToggle(state) {
      state.selectedAll = !state.selectedAll
    },
    selectedAllTrue(state) {
      state.selectedAll = true
    },
    selectedAllFalse(state) {
      state.selectedAll = false
    }
  }
});

export const { selectedAllToggle, selectedAllTrue, selectedAllFalse } = selectedAllSlice.actions;


export default selectedAllSlice.reducer;
