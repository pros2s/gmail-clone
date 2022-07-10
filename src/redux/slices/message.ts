import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types/message";
import { fetchApiMessageById } from "./ActionCreators";


interface MessageInfoState {
  info: IMessage | null,
  isLoading: boolean,
  isError: string
}

const initialState: MessageInfoState = {
  info: null,
  isLoading: false,
  isError: ''
};

export const messageItemSlice = createSlice({
  name: 'messageInfo',
  initialState,
  reducers: {},
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


export default messageItemSlice.reducer;
