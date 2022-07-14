import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFolders } from '../../types/message';


interface SelectedMessagesState {
  folderNamesArray: IFolders[]
};

const initialState: SelectedMessagesState = {
  folderNamesArray: []
};

const selectedMessagesSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    addSelected(state, { payload }: PayloadAction<IFolders>) {
      state.folderNamesArray = [ ...state.folderNamesArray, payload ];
    },
    removeSeletedById(state, { payload }: PayloadAction<string>) {
      state.folderNamesArray = state.folderNamesArray.filter((foldersArray) => foldersArray.id !== payload);
    },
    clearSelected(state) {
      state.folderNamesArray = []
    }
  }
});

export const { addSelected, removeSeletedById, clearSelected } = selectedMessagesSlice.actions;


export default selectedMessagesSlice.reducer;
