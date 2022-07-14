import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface SelectedMenuState {
  selectedAll: boolean,
  selectedType: string
};

const initialState: SelectedMenuState = {
  selectedAll: false,
  selectedType: ''
};

const selectedMenuSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectedAllToggle(state) {
      state.selectedAll = !state.selectedAll;
      state.selectedType = '';
    },
    selectedAllTrue(state) {
      state.selectedAll = true;
      state.selectedType = '';
    },
    selectedAllFalse(state) {
      state.selectedAll = false;
      state.selectedType = '';
    },
    setSelectedType(state, { payload }: PayloadAction<string>) {
      state.selectedType = payload;
    }
  }
});

export const {
  selectedAllToggle,
  selectedAllTrue,
  selectedAllFalse,
  setSelectedType
} = selectedMenuSlice.actions;


export default selectedMenuSlice.reducer;
