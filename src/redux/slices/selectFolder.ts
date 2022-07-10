import { createSlice } from "@reduxjs/toolkit";


interface SelectFolderState {
  folders: string[]
};

const initialState: SelectFolderState = {
  folders: [ 'Inbox', 'Sent', 'Draft', 'Deleted', 'Spam' ]
};

const selectFolderSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {}
});


export default selectFolderSlice.reducer;
