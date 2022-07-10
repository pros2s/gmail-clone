import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface foldersState {
  folderName: string
};

const initialState: foldersState = {
  folderName: 'Inbox'
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolderName(state, { payload }: PayloadAction<string>) {
      state.folderName = payload
    }
  }
});

export const { setFolderName } = foldersSlice.actions;


export default foldersSlice.reducer;
