import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FolderNamesState {
  folderNames: string[]
};

const initialState: FolderNamesState = {
  folderNames: []
};

const messageFolderNamesSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    addFolderName(state, { payload }: PayloadAction<string>) {
      state.folderNames = [ ...state.folderNames, payload ];
    },
    removeFolderName(state, { payload }: PayloadAction<string>) {
      state.folderNames = state.folderNames.filter((name) => name !== payload);
    },
    clearFolderNames(state) {
      state.folderNames = []
    }
  }
});

export const { addFolderName, clearFolderNames, removeFolderName } = messageFolderNamesSlice.actions;


export default messageFolderNamesSlice.reducer;
