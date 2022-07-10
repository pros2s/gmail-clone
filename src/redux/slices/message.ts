import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types/message";
import { fetchApiMessageById } from "./ActionCreators";


interface MessageItemState {
  info: IMessage | null,
  folderName: string,
  isLoading: boolean,
  isError: string
}

const initialState: MessageItemState = {
  info: null,
  folderName: 'Inbox',
  isLoading: false,
  isError: ''
};

export const messageItemSlice = createSlice({
  name: 'messageInfo',
  initialState,
  reducers: {
    setFolderName(state, { payload }: PayloadAction<string>) {
      state.folderName = payload;
    }
  },
  extraReducers: {
    [ fetchApiMessageById.pending.type ]: (state) => {
      state.isLoading = true;
    },
    [ fetchApiMessageById.fulfilled.type ]: (state, { payload }: PayloadAction<IMessage>) => {
      state.info = payload;
      state.isLoading = false;
      state.isError = '';
    },
    [ fetchApiMessageById.rejected.type ]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = payload;
      state.info = null;
    }
  }
});

export const { setFolderName } = messageItemSlice.actions;


export default messageItemSlice.reducer;
