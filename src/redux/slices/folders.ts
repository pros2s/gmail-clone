import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FoldersState {
  folders: string[],
  currentFolder: string
};

const initialState: FoldersState = {
  folders: [ 'Inbox', 'Sent', 'Starred', 'Draft', 'Deleted', 'Spam' ],
  currentFolder: 'Inbox'
};

const foldersSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    setCurrentFolder(state, { payload }: PayloadAction<string>) {
      state.currentFolder = payload;
    }
  }
});

export const { setCurrentFolder } = foldersSlice.actions;


export default foldersSlice.reducer;
